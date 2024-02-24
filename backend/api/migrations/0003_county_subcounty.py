# Generated by Django 4.2.10 on 2024-02-24 21:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20240224_0604'),
    ]

    operations = [
        migrations.CreateModel(
            name='County',
            fields=[
                ('county_id', models.AutoField(primary_key=True, serialize=False)),
                ('county_name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='SubCounty',
            fields=[
                ('subcounty_id', models.AutoField(primary_key=True, serialize=False)),
                ('subcounty_name', models.CharField(max_length=100)),
                ('county', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.county')),
            ],
        ),
    ]