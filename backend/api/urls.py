#backend/api/urls.py
from django.urls import path
from api.views import CreateUserView , NoteListCreate , NoteDelete
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('user/register/', CreateUserView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='get_token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    path('note/', NoteListCreate.as_view(), name='note_list'),
    path('note/delete/<int:pk>/', NoteDelete.as_view(), name='note_delete'),
]
