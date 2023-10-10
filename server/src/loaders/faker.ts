import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';

import { locationData } from '@/utils/locationData';
import { IProduct } from '@/interfaces/product';

let productId = 0

function createRandomUser() {
    return {
        text: faker.person.firstName(),
        id: faker.string.uuid(),
    };
}

export async function addNewProduct(product: IProduct): Promise<IProduct> {
    return {
        productId: productId++,
        productName: product.productName,
        productOwnerName: product.productOwnerName,
        developers: product.developers,
        scrumMasterName: product.scrumMasterName,
        startDate: dayjs(faker.date.past()).format('YYYY/MM/DD'),
        methodology: product.methodology,
        location: product.location,
    };
}

async function createRandomProduct(): Promise<IProduct> {
    return {
        productId: productId++,
        productName: faker.lorem.word(),
        productOwnerName: faker.person.firstName(),
        developers: faker.helpers.multiple(createRandomUser, {
            count: 5,
        }),
        scrumMasterName: faker.person.firstName(),
        startDate: dayjs(faker.date.past()).format('YYYY/MM/DD'),
        methodology: faker.helpers.arrayElement(['Waterfall', 'Agile']),
        location: faker.helpers.arrayElement(await locationData()),
    };
}

export async function createRandomProducts(count: number): Promise<IProduct[]> {
    const promises = Array.from({ length: count }, () => createRandomProduct());
    const products = await Promise.all(promises);

    return products;
}
