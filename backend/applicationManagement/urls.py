from django.urls import path, include, re_path
from .views import *

urlpatterns = [
    path('applicants/', ApplicantDetailsListView.as_view()),
    path('applicants/<pk>/', ApplicantDetailsView.as_view()),
    path('applications/', ApplicationDetailsListView.as_view()),
    path('applications/<pk>/', ApplicationDetailsView.as_view()),
    path('view_applications/', ApplicationsListView.as_view()),
    path('view_applications/<pk>/', ApplicationsView.as_view()),
    path('reviewers/', ReviewerDetailsListView.as_view()),
    path('reviewers/<pk>/', ReviewerDetailsView.as_view()),
    path('date_range/applications/', ApplicationDateRangeListView.as_view()),
    path('chartData/', ApplicationChartListView.as_view()),
]