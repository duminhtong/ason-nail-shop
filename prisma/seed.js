const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding data...')

  // Clean existing data
  await prisma.productVariant.deleteMany()
  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.pricingRule.deleteMany()

  // 1. Create Pricing Rules
  await prisma.pricingRule.createMany({
    data: [
      { name: 'Exchange Rate CNY to VND', key: 'CNY_TO_VND', value: 3500 },
      { name: 'Global Multiplier', key: 'GLOBAL_MULTIPLIER', value: 2.5 },
      { name: 'Default Shipping Fee', key: 'DEFAULT_SHIPPING', value: 20000 },
    ],
  })

  // 2. Create Categories
  const categoryNails = await prisma.category.create({
    data: { name: 'Nails & Art', slug: 'nails-art', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600' }
  })
  
  const categoryTools = await prisma.category.create({
    data: { name: 'Beauty Tools', slug: 'beauty-tools', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600' }
  })

  // 3. Create Products
  const product1 = await prisma.product.create({
    data: {
      name: 'Professional LED UV Nail Lamp 120W',
      slug: 'professional-led-uv-nail-lamp-120w',
      description: 'High power 120W UV LED Nail Lamp with 36pcs LED beads. Auto sensor, 4 timer settings. Suitable for all gel polishes.',
      costPrice: 85, // CNY
      sellingPrice: 350000, // VND
      originalPrice: 450000,
      profitMargin: 65,
      categoryId: categoryNails.id,
      isTrending: true,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=600', isMain: true }
        ]
      },
      variants: {
        create: [
          { name: 'Plug', value: 'US' },
          { name: 'Plug', value: 'EU' }
        ]
      }
    }
  })

  const product2 = await prisma.product.create({
    data: {
      name: 'Premium Gel Polish Set 24 Colors',
      slug: 'premium-gel-polish-set-24-colors',
      description: 'Salon quality gel polish set with 24 vibrant colors.',
      costPrice: 200, // CNY
      sellingPrice: 850000, // VND
      originalPrice: 1200000,
      profitMargin: 70,
      categoryId: categoryNails.id,
      isTrending: true,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1632832865660-f46332ecf042?auto=format&fit=crop&q=80&w=600', isMain: true }
        ]
      }
    }
  })

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
