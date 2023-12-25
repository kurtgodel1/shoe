import logging
from rest_framework import viewsets
from .models import User, Product, Order, OrderItem, Cart, CartItem, Review, Category
from .serializers import UserSerializer, ProductSerializer, OrderSerializer
from .serializers import OrderItemSerializer, CartSerializer, CartItemSerializer, ReviewSerializer
from .serializers import CategorySerializer

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class UserViewSet(viewsets.ModelViewSet):
    logger.info("UserViewSet called")
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductViewSet(viewsets.ModelViewSet):
    logger.info("ProductViewSet called")
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        limit = self.request.query_params.get('limit')
        category = self.request.query_params.get('category')
        if category is not None:
            queryset = queryset.filter(category__name=category)
        if limit is not None:
            queryset = queryset[:int(limit)]
        return queryset


class OrderViewSet(viewsets.ModelViewSet):
    logger.info("OrderViewSet called")
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrderItemViewSet(viewsets.ModelViewSet):
    logger.info("OrderItemViewSet called")
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer


class CartViewSet(viewsets.ModelViewSet):
    logger.info("CartViewSet called")
    queryset = Cart.objects.all()
    serializer_class = CartSerializer


class CartItemViewSet(viewsets.ModelViewSet):
    logger.info("CartItemViewSet called")
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer


class ReviewViewSet(viewsets.ModelViewSet):
    logger.info("ReviewViewSet called")
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
