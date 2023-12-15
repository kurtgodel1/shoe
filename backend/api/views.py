import logging
from rest_framework import viewsets
from .models import User, Product, Order, OrderItem, Cart, CartItem, Review, Category
from .serializers import UserSerializer, ProductSerializer, OrderSerializer, OrderItemSerializer, CartSerializer, CartItemSerializer, ReviewSerializer, CategorySerializer
from silk.profiling.profiler import silk_profile

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
