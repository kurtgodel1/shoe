import logging
from rest_framework import viewsets
from .models import User, Product, Order, OrderItem, Cart, CartItem, Review, Category
from .serializers import UserSerializer, ProductSerializer, OrderSerializer
from .serializers import OrderItemSerializer, CartSerializer, CartItemSerializer, ReviewSerializer
from .serializers import CategorySerializer
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import openai
from openai import OpenAI


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class GenerateImageView(APIView):
    def post(self, request, *args, **kwargs):
        prompt = request.data.get("prompt")
        api_key = request.data.get("apiKey")

        if not api_key:
            return Response({"error": "API key is required"}, status=status.HTTP_400_BAD_REQUEST)

        openai.api_key = api_key
        client = OpenAI(api_key=api_key)

        try:
            response = client.images.generate(
                    model="dall-e-3",
                    prompt=prompt,
                    n=1,
                    size="1024x1024"
                    )
            logger.info(response)
            image_url = response.data[0].url
            return Response({"imageUrl": image_url})
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category')
        if category is not None:
            queryset = queryset.filter(category__name=category)
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
