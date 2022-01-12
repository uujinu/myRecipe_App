from .models import *
from .views import *
from rest_framework import serializers
from accounts.serializers import UserSerializer


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'

    def to_representation(self, instance):
        repr = super().to_representation(instance)
        repr['author'] = UserSerializer(instance.author).data
        repr['created_at'] = instance.created_at.strftime('%Y.%m.%d %H:%M')
        return repr


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['name', 'quantity']


class CookStepSerializer(serializers.ModelSerializer):
    step_image = serializers.ImageField(use_url=True, required=False)

    class Meta:
        model = CookStep
        fields = ['step_id', 'description', 'step_image']


class RecipeImageSerializer(serializers.ModelSerializer):
    recipe_image = serializers.ImageField(use_url=True, required=False)

    def to_representation(self, instance):
        repr = super().to_representation(instance)
        return repr['recipe_image']

    class Meta:
        model = Images
        fields = ['recipe_image']


class PostWriteSerializer(serializers.ModelSerializer):
    images = RecipeImageSerializer(required=False, many=True)
    ingredients = IngredientSerializer(many=True)
    cooksteps = CookStepSerializer(many=True)

    class Meta:
        model = Post
        fields = ['author', 'title', 'thumbnail', 'cook_portion', 'cook_time', 'cook_degree',
                  'description', 'ingredients', 'cooksteps', 'content', 'images']

    def create(self, validated_data):
        ingredients = validated_data.pop('ingredients')
        cooksteps = validated_data.pop('cooksteps')
        images = ''
        thumb = ''

        if validated_data.get('images'):
            images = validated_data.pop('images')

        if validated_data.get('thumbnail'):
            thumb = validated_data.pop('thumbnail')

        post = Post.objects.create(**validated_data)

        Ingredient.objects.bulk_create(
            [Ingredient(post=post, **ings) for ings in ingredients])
        CookStep.objects.bulk_create(
            [CookStep(post=post, **steps) for steps in cooksteps])
        if images:
            Images.objects.bulk_create(
                [Images(post=post, **imgs) for imgs in images])

        if thumb:
            post.thumbnail = thumb
            post.save()

        return post

    def validate(self, attrs):
        for ing in attrs['ingredients']:
            if (ing['name'] and ing['quantity']) is None:
                raise serializers.ValidationError(
                    '[ingredients] Fill in the blank.')
        for step in attrs['cooksteps']:
            if step['description'] is None:
                raise serializers.ValidationError(
                    '[cooksteps] Fill in the blank')

        return attrs


class PostListSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        repr = super().to_representation(instance)
        repr['author'] = UserSerializer(instance.author).data
        repr['created_at'] = instance.datetime
        return repr

    class Meta:
        model = Post
        fields = ['id', 'author', 'title', 'thumbnail',
                  'total_likes', 'score_average', 'created_at']
        read_only_fields = ['id', 'title', 'total_likes', 'score_average']


class PostDetailSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        repr = super().to_representation(instance)
        repr['author'] = UserSerializer(instance.author).data
        repr['created_at'] = instance.datetime

        repr['cooksteps'] = CookStepSerializer(
            instance.cooksteps, many=True).data
        repr['images'] = RecipeImageSerializer(instance.images, many=True).data
        repr['ingredients'] = IngredientSerializer(
            instance.ingredients, many=True).data
        repr['cookInfo'] = {
            'cookDegree': instance.get_cook_degree_display(),
            'cookPortion': instance.get_cook_portion_display(),
            'cookTime': instance.get_cook_time_display()
        }

        try:
            repr['comments'] = CommentSerializer(
                instance.comments, many=True).data
        except:
            repr['comments'] = None
        return repr

    class Meta:
        model = Post
        fields = ['title', 'thumbnail', 'total_likes', 'score_average',
                  'total_comments', 'total_bookmarks', 'description', 'content']
        read_only_fields = ['title', 'thumbnail']
