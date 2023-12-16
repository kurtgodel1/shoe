from django.contrib import admin
from .models import User, Product, Order, OrderItem, Cart, CartItem, Review, Category

# Optionally, you can create custom admin classes to customize the admin interface
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'size', 'color', 'brand', 'stock')
    search_fields = ('name', 'brand', 'category')


class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('user__username', 'status')


class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'product', 'quantity', 'price')
    search_fields = ('order__id', 'product__name')


class CartAdmin(admin.ModelAdmin):
    list_display = ('user',)
    search_fields = ('user__username',)


class CartItemAdmin(admin.ModelAdmin):
    list_display = ('cart', 'product', 'quantity')
    search_fields = ('cart__user__username', 'product__name')


class ReviewAdmin(admin.ModelAdmin):
    list_display = ('product', 'user', 'rating', 'created_at')
    list_filter = ('rating', 'created_at')
    search_fields = ('product__name', 'user__username')


# Register your models here.
admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
admin.site.register(Cart, CartAdmin)
admin.site.register(CartItem, CartItemAdmin)
admin.site.register(Review, ReviewAdmin)


# If you have extended the User model and want to use Django's built-in User admin:
from django.contrib.auth.admin import UserAdmin
admin.site.register(User, UserAdmin)
