import fs from 'fs';
import path from 'path';

// Types for service data structure
export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  slug: string;
}

export interface Service {
  slug: string;
  icon: string;
  name: string;
  description: string;
  categoryId: string;
  badge?: string;
  stats?: string;
}

export interface ServiceWithCategory extends Service {
  category: ServiceCategory;
}

// Path to services data directory
const SERVICES_DATA_PATH = path.join(process.cwd(), 'data', 'services');

/**
 * Fetch all service categories from categories.json
 */
export async function getServiceCategories(): Promise<ServiceCategory[]> {
  try {
    const categoriesPath = path.join(SERVICES_DATA_PATH, 'categories.json');
    const fileContents = fs.readFileSync(categoriesPath, 'utf8');
    const categories: ServiceCategory[] = JSON.parse(fileContents);
    return categories;
  } catch (error) {
    console.error('Error loading service categories:', error);
    return [];
  }
}

/**
 * Fetch services for a specific category by ID
 */
export async function getServicesByCategory(categoryId: string): Promise<Service[]> {
  try {
    const servicesPath = path.join(SERVICES_DATA_PATH, `${categoryId}.json`);
    const fileContents = fs.readFileSync(servicesPath, 'utf8');
    const services: Service[] = JSON.parse(fileContents);
    return services;
  } catch (error) {
    console.error(`Error loading services for category ${categoryId}:`, error);
    return [];
  }
}

/**
 * Fetch all services across all categories with their category information
 */
export async function getAllServices(): Promise<ServiceWithCategory[]> {
  try {
    const categories = await getServiceCategories();
    const allServices: ServiceWithCategory[] = [];

    for (const category of categories) {
      const services = await getServicesByCategory(category.id);
      const servicesWithCategory = services.map(service => ({
        ...service,
        category
      }));
      allServices.push(...servicesWithCategory);
    }

    return allServices;
  } catch (error) {
    console.error('Error loading all services:', error);
    return [];
  }
}

/**
 * Get service categories with their services
 */
export async function getServicesGroupedByCategory(): Promise<Array<ServiceCategory & { services: Service[] }>> {
  try {
    const categories = await getServiceCategories();
    const categoriesWithServices = await Promise.all(
      categories.map(async (category) => {
        const services = await getServicesByCategory(category.id);
        return {
          ...category,
          services
        };
      })
    );
    return categoriesWithServices;
  } catch (error) {
    console.error('Error loading services grouped by category:', error);
    return [];
  }
}

/**
 * Get a single service by slug
 */
export async function getServiceBySlug(slug: string): Promise<ServiceWithCategory | null> {
  try {
    const allServices = await getAllServices();
    return allServices.find(service => service.slug === slug) || null;
  } catch (error) {
    console.error(`Error loading service ${slug}:`, error);
    return null;
  }
}

/**
 * Get category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<ServiceCategory | null> {
  try {
    const categories = await getServiceCategories();
    return categories.find(category => category.slug === slug) || null;
  } catch (error) {
    console.error(`Error loading category ${slug}:`, error);
    return null;
  }
}
