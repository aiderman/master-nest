import { DataSource } from 'typeorm';
import * as faker from 'faker';

async function seed() {
    const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'rootUser',
        password: 'Artha161092@',
        database: 'masterNest',
        entities: ['src/**/*.entity.ts'],
        synchronize: true,
    });

    await dataSource.initialize();

    const userRepository = dataSource.getRepository('User');

    for (let i = 0; i < 10; i++) {
        await userRepository.save({
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        });
    }

    console.log('Data seeded successfully!');
}

seed();