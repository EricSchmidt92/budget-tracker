import { categories } from "@/mocks/handlers";

const { name: category1Name, id: category1Id } = categories[0];
const { name: category2Name } = categories[1];
const category1Regex = new RegExp(category1Name, "i");
const category2Regex = new RegExp(category2Name, "i");

//TODO: these were for old component, scrap for parts as needed;
it.todo("Write new tests since the old ones are no longer valuable");
