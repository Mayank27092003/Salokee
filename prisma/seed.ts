import 'dotenv/config';
import { PrismaClient, Role, AccountStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ─── Super Admin ──────────────────────────────────────────
  const superAdminPassword = await bcrypt.hash('Admin@123456', 12);

  const superAdmin = await prisma.user.upsert({
    where: { email: 'superadmin@salonplatform.com' },
    update: {},
    create: {
      email: 'superadmin@salonplatform.com',
      passwordHash: superAdminPassword,
      firstName: 'Super',
      lastName: 'Admin',
      role: Role.SUPER_ADMIN,
      status: AccountStatus.ACTIVE,
      emailVerified: true,
      emailVerifiedAt: new Date(),
      adminProfile: { create: { department: 'Engineering' } },
    },
  });
  console.log(`✅ Super admin: ${superAdmin.email}`);

  // ─── Demo Admin (Salon Owner) ─────────────────────────────
  const adminPassword = await bcrypt.hash('Admin@123456', 12);

  const demoAdmin = await prisma.user.upsert({
    where: { email: 'owner@demosalon.com' },
    update: {},
    create: {
      email: 'owner@demosalon.com',
      passwordHash: adminPassword,
      firstName: 'Demo',
      lastName: 'Owner',
      role: Role.ADMIN,
      status: AccountStatus.ACTIVE,
      emailVerified: true,
      emailVerifiedAt: new Date(),
      adminProfile: { create: { department: 'Management' } },
    },
  });
  console.log(`✅ Demo admin: ${demoAdmin.email}`);

  // ─── Demo Customer ────────────────────────────────────────
  const customerPassword = await bcrypt.hash('Customer@123456', 12);

  const demoCustomer = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      passwordHash: customerPassword,
      firstName: 'Jane',
      lastName: 'Smith',
      role: Role.CUSTOMER,
      status: AccountStatus.ACTIVE,
      emailVerified: true,
      emailVerifiedAt: new Date(),
      customerProfile: { create: { loyaltyPoints: 100 } },
    },
  });
  console.log(`✅ Demo customer: ${demoCustomer.email}`);

  // ─── Demo Salon (Phase 2 scaffold) ───────────────────────
  const salon = await prisma.salon.upsert({
    where: { slug: 'demo-salon' },
    update: {},
    create: {
      slug: 'demo-salon',
      name: 'The Demo Salon',
      description: 'A premium hair and beauty salon',
      email: 'hello@demosalon.com',
      phone: '+1-555-0100',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      postalCode: '10001',
      status: AccountStatus.ACTIVE,
      timezone: 'America/New_York',
      currency: 'USD',
      businessHours: {
        mon: { open: '09:00', close: '18:00', isOpen: true },
        tue: { open: '09:00', close: '18:00', isOpen: true },
        wed: { open: '09:00', close: '18:00', isOpen: true },
        thu: { open: '09:00', close: '20:00', isOpen: true },
        fri: { open: '09:00', close: '20:00', isOpen: true },
        sat: { open: '10:00', close: '17:00', isOpen: true },
        sun: { open: '11:00', close: '16:00', isOpen: false },
      },
    },
  });
  console.log(`✅ Demo salon: ${salon.name}`);

  console.log('\n✅ Seeding complete!');
  console.log('\nDefault credentials:');
  console.log('  Super Admin: superadmin@salonplatform.com / Admin@123456');
  console.log('  Salon Admin: owner@demosalon.com / Admin@123456');
  console.log('  Customer:    customer@example.com / Customer@123456');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
