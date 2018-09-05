from django.urls import path

from . import views

urlpatterns = [
    path('', views.oracleIndex, name='oracleIndex'),
    path('query/response', views.oracleResponse, name="oracleResponse"),
    path('query/autocomp', views.queryAutosuggest, name="autocomp_routes"),
    path('loaderio-66417165d8f4c651a7a4a33b4dd4c867.txt', views.loadTest, name="loaderio"),
]
