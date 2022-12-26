import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "eletricityApplication.settings")

import django

django.setup()
import csv
import datetime

from applicationManagement.models import ApplicantDetails, ReviewerDetails, ApplicationDetails


def run():
    with open('electricity_board_case_study.csv', encoding='utf-8') as file:
        reader = csv.reader(file)
        next(reader)  # Advance past the header
        ApplicationDetails.objects.all().delete()
        ApplicantDetails.objects.all().delete()
        ReviewerDetails.objects.all().delete()
        count = 1
        for row in reader:
            print(row)
            applicant, created = ApplicantDetails.objects.get_or_create(name=row[1],
                                                                        id=count,
                                                                        gender=row[2],
                                                                        district=row[3],
                                                                        state=row[4],
                                                                        pincode=row[5],
                                                                        govt_id_type=row[7],
                                                                        govt_id_no=row[8])
            reviewer, created = ReviewerDetails.objects.get_or_create(reviewer_id=row[-3],
                                                                      reviewer_name=row[-2])
            if row[-7] == "":
                application_date = None
            else:
                application_date = datetime.datetime.strptime(row[-7], '%d-%m-%y')
            if row[-6] == "":
                approval_date = None
            else:
                approval_date = datetime.datetime.strptime(row[-6], '%d-%m-%y')
            if row[-5] == "":
                modified_date = None
            else:
                modified_date = datetime.datetime.strptime(row[-5], '%d-%m-%y')
            # application_date = datetime.datetime.strptime(row[-7], '%d-%m-%y')
            # approval_date = datetime.datetime.strptime(row[-6], '%d-%m-%y')
            # modified_date = datetime.datetime.strptime(row[-5], '%d-%m-%y')

            application_details = ApplicationDetails(applicant=applicant,
                                                     reviewer=reviewer,
                                                     id=row[0],
                                                     ownership=row[6],
                                                     category=row[9],
                                                     load_applied=row[10],
                                                     status=row[-4],
                                                     reviewer_comments=row[-1],
                                                     application_date=application_date,
                                                     approval_date=approval_date,
                                                     modified_date=modified_date
                                                     )
            application_details.save()
            count += 1

run()
