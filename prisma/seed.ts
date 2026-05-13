import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = `${process.env.DATABASE_URL}`
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding Supabase Database...')

  // Clear existing products and configs
  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.siteConfig.deleteMany()

  // Create site configurations
  await prisma.siteConfig.createMany({
    data: [
      { key: "BRAND_NAME", value: "CYBER BEAUTY" },
      { key: "HERO_TITLE", value: "NEON CHIC" },
      { key: "HERO_BUTTON", value: "Explore Collection" },
      { key: "HERO_IMAGE", value: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvP3Ei64Jm3nKXZoS_tl_Dcq7lnLXYfFbfDicZli1hRiTKGfor199UEy9NORxyfbl9ZYhoHd67saDw-havKKwYn-E5yUQUKjfx3_xstzGZWpn35GEQUNLFkfzvtQvrGGcgm190uxlmYH_Uvl0DnsgAc0BSYCiwZoToSsG1Q_olU8GO296DtDS8G5CSXqN2Vuj_RhQwELTcZTVMPJ4-npxZG33R-ShhXkdjR2OVXedVx5Sj9s2TigPnPqtbKhYoASsNCj5O4M1Vcb5i" }
    ]
  })

  // Create category
  const nailCategory = await prisma.category.create({
    data: {
      name: 'Sơn Gel Cao Cấp',
      slug: 'son-gel-cao-cap',
    }
  })

  const phuKienCategory = await prisma.category.create({
    data: {
      name: 'Phụ Kiện Tiệm Nail',
      slug: 'phu-kien-tiem-nail',
    }
  })

  // Create products
  const products = [
    {
      name: 'Sơn Gel Thạch Hồng Kim Tuyến Synapse',
      slug: 'son-gel-thach-hong-kim-tuyen',
      description: 'Công thức siêu bóng bền màu 45 ngày. Nhập khẩu độc quyền.',
      costPrice: 15.0, // CNY
      sellingPrice: 45000, // VND
      profitMargin: 50,
      categoryId: nailCategory.id,
      isTrending: true,
      isNew: true,
      images: {
        create: [
          {
            url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD20_jcpflTuSAinlFM_LKA7V7cA57WJ5QlOEcSNb7g8J1ZaDBa19rXvrUOnTPjQigqXtiWaxtsVAU3O4JZCgwpBgHddZ8jRKD1Hu3CJYHqkgxAo3yLSVnTE_PEmVv6fwE-DCnI8fVapitsZ0Oe8Sc4g2WWKfH7uey9BNF3G5pqblaP28fL2rGSyML9eQwQBH49kUQp8F2d0lczT8kqrTu21VGdRL08StKONH26Oe4aXVH900YSVVx5xZtKfc1O6F9T6jP2pl1Ghz--',
            isMain: true
          }
        ]
      }
    },
    {
      name: 'Bột Tráng Gương Ánh Bạc Chrome Shell',
      slug: 'bot-trang-guong-anh-bac',
      description: 'Hiệu ứng kim loại lỏng cực sáng. 1 hũ dùng 50 bộ nail.',
      costPrice: 8.0, 
      sellingPrice: 25000, 
      originalPrice: 35000,
      profitMargin: 60,
      categoryId: phuKienCategory.id,
      isTrending: true,
      isNew: false,
      images: {
        create: [
          {
            url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcBgb5u0Ej6jMlSbRT3OT0w4CBhN1gcLL4bvwXzAC0_FIkGpttH2iuZv_UZGN4O1-YoDJBaWWlRWypxdrrhNFffqbI_oi6cqKuqd2INp7weh4hVPn2d-uz88XQ33MH5QWp2ICI_pKwL74hUA4YdCaBuQEj07__Z-Oq6nKgDGWtpfDO6Mo1SulKQ-zdr8JOmKDSaF37OQ5Bdd4dB6Jiaha1XLWqwEoSuycvk0F45tYO_bH9Bqyxk8V-YciqHL2rjq2cZWo8NhxAOfiP',
            isMain: true
          }
        ]
      }
    },
    {
      name: 'Mắt Mèo Kim Cương Tím Void Violet',
      slug: 'mat-meo-kim-cuong-tim',
      description: 'Hiệu ứng chuyển màu Hologram sâu thẳm.',
      costPrice: 18.0,
      sellingPrice: 55000,
      originalPrice: 75000,
      profitMargin: 55,
      categoryId: nailCategory.id,
      isTrending: true,
      isNew: false,
      images: {
        create: [
          {
            url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEP4dqy_-mfqSRpsG5eOc88908VVPch9Gtcb11uc5uz56JDhY8P5-Q-M8l_K4UTWxNGP5tkVttM6Jeu1HdkRBdu6_F3EzKK_Yj7vBKcHuyBE-165-01SkGMdzOI28vO8YzT15GacogW6SGYAIqtKFjbA4SCodh6yVr6fp6dC8YszT6BBcmtm_tq2W1mfckt-9Z69NRgxjIGLmRJZUN8A-ir7gYZ1mq__5wjkpILX1c_m3P0F_vxf5Gu-cZEMCcOT90bPjQPqP_bdOZ',
            isMain: true
          }
        ]
      }
    },
    {
      name: 'Top Lì Chống Xước (Matte Top Coat)',
      slug: 'top-li-chong-xuoc',
      description: 'Chống xước, mờ hoàn hảo không bám bẩn.',
      costPrice: 12.0,
      sellingPrice: 35000,
      profitMargin: 50,
      categoryId: nailCategory.id,
      isTrending: false,
      isNew: true,
      images: {
        create: [
          {
            url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApMQjv-PK_eNjvI2GX2r1EbHIZL0xjulMXl0bUJWYrZW7onbI-b9bf-S2yN4iavSsW2NZs7RmdPq2Bq5hJY8xt1WsH--msYR8DqXkhm2l-lRwjp5MsjETF9wX4E0IiKqpXFDSBLkphFnhd4xgHmBR2iiZTQmQvSpSiis89TKOfYOvx0VJukymdr-ihCHjkepiqTqtYNewtNX-3jnHLXGZ3Nb6F900B_kElYaBGqQyEmuy_mr9KiUZmwqfQyH-q9KBa-ESJ4J1iU1An',
            isMain: true
          }
        ]
      }
    },
    {
      name: 'Sơn Gel Đỏ Ruby Thượng Hạng',
      slug: 'son-gel-do-ruby',
      description: 'Màu đỏ chuẩn tone da Châu Á.',
      costPrice: 15.0,
      sellingPrice: 45000,
      profitMargin: 50,
      categoryId: nailCategory.id,
      isTrending: true,
      isNew: false,
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702', // Fallback nail image
            isMain: true
          }
        ]
      }
    },
    {
      name: 'Set 50 Cọ Vẽ Nail Siêu Mảnh',
      slug: 'set-50-co-ve-nail',
      description: 'Lông cọ chồn tự nhiên, vẽ nét siêu nhỏ.',
      costPrice: 40.0,
      sellingPrice: 150000,
      originalPrice: 200000,
      profitMargin: 40,
      categoryId: phuKienCategory.id,
      isTrending: false,
      isNew: true,
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348', // Fallback nail tools image
            isMain: true
          }
        ]
      }
    }
  ]

  for (const p of products) {
    await prisma.product.create({
      data: p
    })
  }

  console.log('Seeded successfully with Premium Nail Products!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
