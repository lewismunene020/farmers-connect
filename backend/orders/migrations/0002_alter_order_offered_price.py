# Generated by Django 4.2.10 on 2024-02-28 22:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='offered_price',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]
