import os
from uuid import uuid4
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db.models.fields import DateTimeField
from django.utils import timezone


def url(instance, filename):
    ymd_path = timezone.now().strftime('%Y/%m/%d')
    uuid_name = uuid4().hex
    extension = os.path.splitext(filename)[-1].lower()
    pk = str(instance.pk if instance.pk != None else instance.post.pk)
    _url = os.path.join('post', pk, 'images', ymd_path, uuid_name + extension)
    return _url


PORTION_CHOICES = (
    ('_1p', '1인분'),
    ('_2p', '2인분'),
    ('_3p', '3인분'),
    ('_4p', '4인분'),
    ('_5p', '5인분'),
    ('_6p', '6인분 이상'),
)
TIME_CHOICES = (
    ('_10m', '10분 이내'),
    ('_15m', '15분 이내'),
    ('_20m', '20분 이내'),
    ('_30m', '30분 이내'),
    ('_60h', '60분 이내'),
    ('_90m', '90분 이내'),
    ('_2h', '2시간 이내'),
    ('_2hp', '2시간 이상')
)
DEGREE_CHOICES = (
    ('_d1', '아무나'),
    ('_d2', '초급'),
    ('_d3', '중급'),
    ('_d4', '고급')
)


class Post(models.Model):

    author = models.ForeignKey(
        'accounts.User', on_delete=models.CASCADE, related_name='post', null=True)
    title = models.CharField('제목', blank=False, max_length=126)

    cook_portion = models.CharField(
        '분량', max_length=10, choices=PORTION_CHOICES)
    cook_time = models.CharField(
        '조리시간', max_length=10, choices=TIME_CHOICES)
    cook_degree = models.CharField(
        '난이도', max_length=10, choices=DEGREE_CHOICES)
    description = models.CharField(
        '간단 설명', max_length=1000)
    content = models.TextField('내용', blank=True, null=True)
    likes = models.ManyToManyField(
        'accounts.User', related_name='like_posts', default=None, blank=True)
    bookmarks = models.ManyToManyField(
        'accounts.User', related_name='bookmarks', default=None, blank=True)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    @property
    def datetime(self):
        return self.created_at.strftime('%Y.%m.%d')

    def __str__(self):
        return self.title

    def total_likes(self):
        return self.likes.count()

    def score_average(self):  # 평균 평점
        all_scores = self.comments.values()
        avg = 0
        ratings = len(all_scores)
        if ratings:
            for r in all_scores:
                if r['rating'] != None:
                    avg += r['rating']
                else:
                    ratings -= 1
            return round(avg / ratings, 1)

    def total_comments(self):
        return self.comments.count()


class Ingredient(models.Model):
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='ingredients', null=True)
    name = models.CharField('재료명', max_length=100)
    quantity = models.CharField('양', max_length=50)

    def __str__(self):
        return self.name


class CookStep(models.Model):
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='cooksteps', null=True)
    step_id = models.PositiveIntegerField('순서')
    description = models.TextField('레시피설명')
    step_image = models.ImageField(
        '레시피사진', upload_to=url, blank=True, null=True)

    def __str__(self):
        return f'step_{self.step_id}'


class Images(models.Model):
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='images', null=True)
    recipe_image = models.ImageField(upload_to=url, blank=True, null=True)

    class Meta:
        ordering = ['pk']

    def __str__(self):
        return f'{self.post.title}_image_{self.pk}'


# 댓글
class Comment(models.Model):
    author = models.ForeignKey(
        'accounts.User', on_delete=models.CASCADE, related_name='comments')
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='comments')
    content = models.CharField(max_length=128, null=True, blank=True)
    rating = models.FloatField(blank=True, null=True, validators=(
        MaxValueValidator(5),
        MinValueValidator(0)))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f'{self.author.nickname} | {self.content}'
