from .models import *
from .views import *
from rest_framework import serializers
from accounts.serializers import UserSerializer


class CommentSerializer(serializers.ModelSerializer):

    created_at = serializers.DateTimeField(format='%Y.%m.%d %H:%M')

    class Meta:
        model = Comment
        fields = '__all__'
        #read_only_fields = ['author']
        #exclude = ['id', 'author']

    def to_representation(self, instance):
        repr = super().to_representation(instance)
        repr['author'] = UserSerializer(instance.author).data
        return repr


class BookMarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookMark
        fields = ['owner', 'posts']
        lookup_field = 'owner'


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'quantity']


class CookStepSerializer(serializers.ModelSerializer):
    step_image = serializers.ImageField(use_url=True, required=False)

    class Meta:
        model = CookStep
        fields = ['step_id', 'description', 'step_image']


class RecipeImageSerializer(serializers.ModelSerializer):
    recipe_image = serializers.ImageField(use_url=True, required=False)

    class Meta:
        model = Images
        fields = ['recipe_image']


class PostWriteSerializer(serializers.ModelSerializer):
    images = RecipeImageSerializer(required=False, many=True)
    ingredients = IngredientSerializer(many=True)
    cooksteps = CookStepSerializer(many=True)

    class Meta:
        model = Post
        fields = ['author', 'title', 'cook_portion', 'cook_time', 'cook_degree',
                  'description', 'ingredients', 'cooksteps', 'content', 'images']

    def create(self, validated_data):
        ingredients = validated_data.pop('ingredients')
        cooksteps = validated_data.pop('cooksteps')
        images = ''
        if validated_data.get('images'):
            images = validated_data.pop('images')
        post = Post.objects.create(**validated_data)

        Ingredient.objects.bulk_create(
            [Ingredient(post=post, **ings) for ings in ingredients])
        CookStep.objects.bulk_create(
            [CookStep(post=post, **steps) for steps in cooksteps])
        if images:
            Images.objects.bulk_create(
                [Images(post=post, **imgs) for imgs in images])
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
        fields = ['id', 'author', 'title', 'total_likes', 'total_bookmarks',
                  'total_comments', 'score_average', 'created_at']
        read_only_fields = ['id', 'title', 'total_likes', 'total_bookmarks',
                            'total_comments', 'score_average']
