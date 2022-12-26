from __future__ import unicode_literals
from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework import generics, status
from rest_framework.response import Response
from django.db.models.functions import TruncMonth, TruncYear
from django.db.models import Count
from django.http import JsonResponse
# Create your views here.


class ApplicantDetailsListView(generics.ListCreateAPIView):
    queryset = ApplicantDetails.objects.all()
    serializer_class = ApplicantDetailsSerializer


class ApplicantDetailsView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ApplicantDetailsSerializer
    queryset = ApplicantDetails.objects.all()

    def put(self, request, pk):
        print(request)
        applicant_details = request.data
        existing_applicant = ApplicantDetails.objects.get(pk=pk)
        existing_applicant.name = applicant_details["name"]
        existing_applicant.gender = applicant_details["gender"]
        existing_applicant.district = applicant_details["district"]
        existing_applicant.state = applicant_details["state"]
        existing_applicant.pincode = applicant_details["pincode"]
        existing_applicant.save(update_fields=['name', 'gender', 'district', 'state', 'pincode'])
        return Response({"status": "Applicant Details is updated Successfully"})


class ReviewerDetailsListView(generics.ListCreateAPIView):
    queryset = ReviewerDetails.objects.all()
    serializer_class = ReviewerDetailsSerializer


class ReviewerDetailsView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReviewerDetailsSerializer
    queryset = ReviewerDetails.objects.all()

    def put(self, request, pk):
        print(request)
        reviewer_details = request.data
        existing_reviewer = ReviewerDetails.objects.get(pk=pk)
        existing_reviewer.reviewer_name = reviewer_details.reviewer_name
        existing_reviewer.save(update_fields=['reviewer_name'])
        return Response({"status": "Reviewer Details is updated Successfully"})


class ApplicationDetailsListView(generics.ListCreateAPIView):
    queryset = ApplicationDetails.objects.all()
    serializer_class = ApplicationDetailsSerializer


class ApplicationDetailsView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ApplicationDetailsSerializer
    queryset = ApplicationDetails.objects.all()


class ApplicationsView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ApplicationsSerializer
    queryset = ApplicationDetails.objects.all()

    def put(self, request, pk):
        print(request)
        application_details = request.data
        existing_applications = ApplicationDetails.objects.get(pk=pk)
        existing_applications.applicant = ApplicantDetails.objects.get(pk=application_details["applicant"])
        existing_applications.reviewer = ReviewerDetails.objects.get(pk=application_details["reviewer"])
        existing_applications.ownership = application_details["ownership"]
        existing_applications.category = application_details["category"]
        existing_applications.load_applied = application_details["load_applied"]
        existing_applications.modified_date = application_details["modified_date"]
        existing_applications.status = application_details["status"]
        existing_applications.reviewer_comments = application_details["reviewer_comments"]
        existing_applications.save(update_fields=['applicant', 'reviewer', 'ownership', 'category', 'load_applied',
                                                  'approval_date', 'modified_date', 'status', 'reviewer_comments'])
        return Response({"status": "Application Details is updated Successfully"})


class ApplicationsListView(generics.ListCreateAPIView):
    queryset = ApplicationDetails.objects.all()
    serializer_class = ApplicationsSerializer


class ApplicationDateRangeListView(APIView):

    def get(self, request):
        start_time = datetime.datetime.strptime(request.query_params["start_time"], '%Y-%m-%d')
        end_time = datetime.datetime.strptime(request.query_params["end_time"], '%Y-%m-%d')
        queryset = ApplicationDetails.objects.filter(application_date__range=[start_time, end_time])
        applications = ApplicationDetailsSerializer(queryset, many=True)
        return Response({'status': applications.data}, status=status.HTTP_200_OK)


class ApplicationChartListView(APIView):

    def get(self, request):
        queryset_approved = ApplicationDetails.objects.filter(status__exact="Approved").annotate(month=TruncMonth('application_date'), year=TruncYear('application_date'),).values('month','year').annotate(total=Count('id')).order_by("month").values('month', 'total')
        # applications = ApplicationDetailsSerializer(queryset, many=True)
        queryset_rejected = ApplicationDetails.objects.filter(status__exact="Rejected").annotate(
            month=TruncMonth('application_date')).values('month').annotate(total=Count('id')).order_by("month").values(
            'month', 'total')
        queryset_pending = ApplicationDetails.objects.filter(status__exact="Pending").annotate(
            month=TruncMonth('application_date')).values('month').annotate(total=Count('id')).order_by("month").values(
            'month', 'total')
        queryset_connection_released = ApplicationDetails.objects.filter(status__exact="Connection Released").annotate(
            month=TruncMonth('application_date')).values('month').annotate(total=Count('id')).order_by("month").values(
            'month', 'total')
        queryset_total = ApplicationDetails.objects.annotate(
            month=TruncMonth('application_date')).values('month').annotate(total=Count('id')).order_by("month").values(
            'month', 'total')
        return Response({'approved': list(queryset_approved), 'rejected' : list(queryset_pending),
                         'pending':list(queryset_rejected), 'connection_released' :list(queryset_connection_released)
                         ,'total': list(queryset_total)}, status=status.HTTP_200_OK)