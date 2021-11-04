from django.contrib import admin
from .models import *

admin.site.register(CookStep)


class IngredientInline(admin.TabularInline):
    model = Ingredient


class CookStepInline(admin.TabularInline):
    model = CookStep


class ImageInline(admin.TabularInline):
    model = Images


class CommentInline(admin.TabularInline):
    model = Comment


@admin.register(Post)
class RecipeAdmin(admin.ModelAdmin):
    inlines = (IngredientInline, CookStepInline, ImageInline, CommentInline)
    list_display = (
        'author',
        'title',
        'score_average',
    )
