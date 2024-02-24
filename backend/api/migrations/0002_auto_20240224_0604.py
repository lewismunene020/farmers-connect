# Generated by Django 4.2.10 on 2024-02-24 06:04

from django.db import migrations

def seed_categories_and_products(apps, schema_editor):
    Category = apps.get_model('api', 'Category')
    Product = apps.get_model('api', 'Product')

    categories = [
        {'category_name': 'Fruits'},
        {'category_name': 'Vegetables'},
        {'category_name': 'Grains'},
        {'category_name': 'Dairy Products'},
        {'category_name': 'Poultry'},
    ]
    
    for category_data in categories:
        category = Category.objects.create(**category_data)
        
        # Populate products for each category
        if category.category_name == 'Fruits':
            products = [
                {'product_name': 'Mangoes', 'unit': 'kg'},
                {'product_name': 'Bananas', 'unit': 'bunch'},
                {'product_name': 'Pineapples', 'unit': 'piece'},
                {'product_name': 'Avocados', 'unit': 'piece'},
                {'product_name': 'Oranges', 'unit': 'kg'},
            ]
        elif category.category_name == 'Vegetables':
            products = [
                {'product_name': 'Tomatoes', 'unit': 'kg'},
                {'product_name': 'Onions', 'unit': 'kg'},
                {'product_name': 'Cabbages', 'unit': 'piece'},
                {'product_name': 'Carrots', 'unit': 'kg'},
                {'product_name': 'Spinach', 'unit': 'kg'},
                {'product_name': 'Sukuma Wiki', 'unit': 'kg'},
            ]
        elif category.category_name == 'Grains':
            products = [
                {'product_name': 'Maize', 'unit': 'kg'},
                {'product_name': 'Beans', 'unit': 'kg'},
                {'product_name': 'Rice', 'unit': 'kg'},
                {'product_name': 'Wheat', 'unit': 'kg'},
                {'product_name': 'Sorghum', 'unit': 'kg'},
            ]
        elif category.category_name == 'Dairy Products':
            products = [
                {'product_name': 'Fresh Milk', 'unit': 'litre'},
                {'product_name': 'Mala', 'unit': 'litre'},
                {'product_name': 'Cheese', 'unit': 'kg'},
                {'product_name': 'Butter', 'unit': 'kg'},
                {'product_name': 'Ghee', 'unit': 'kg'},
            ]
        elif category.category_name == 'Poultry':
            products = [
                {'product_name': 'Chicken (Broilers)', 'unit': 'kg'},
                {'product_name': 'Eggs', 'unit': 'piece'},
            ]
        
        for product_data in products:
            product_data['category'] = category
            Product.objects.create(**product_data)

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(seed_categories_and_products),
    ]
