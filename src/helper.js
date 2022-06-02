import faker from 'faker';

export function fetchData(count = 30) {
    return Array.from({length: count}, (_) => {
        return {
            ...faker.helpers.contextualCard(),
            paragraph: faker.lorem.paragraph(),
        }
    })
}