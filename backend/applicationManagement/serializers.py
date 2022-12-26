from .models import ApplicationDetails, ApplicantDetails, ReviewerDetails
from rest_framework import serializers


class ApplicantDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicantDetails
        fields = ('id', 'name', 'gender', 'district', 'state', 'pincode', 'govt_id_type', 'govt_id_no')


class ReviewerDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewerDetails
        fields = ('reviewer_id', 'reviewer_name')


class ApplicationDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = ApplicationDetails
        fields = ('id', 'applicant', 'reviewer', 'ownership', 'category', 'application_date', 'load_applied',
                  'approval_date', 'modified_date', 'status', 'reviewer_comments')
    applicant = ApplicantDetailsSerializer()
    reviewer = ReviewerDetailsSerializer()


class ApplicationsSerializer(serializers.ModelSerializer):

    class Meta:
        model = ApplicationDetails
        fields = ('id', 'applicant', 'reviewer', 'ownership', 'category', 'application_date', 'load_applied',
                  'approval_date', 'modified_date', 'status', 'reviewer_comments')

