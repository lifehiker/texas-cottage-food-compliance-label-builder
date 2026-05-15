import type { ProductInput } from "@/lib/types";

type MarketingPage = {
  slug: string;
  keyword: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  bullets: string[];
  exampleTitle: string;
  exampleProduct: ProductInput;
  faq: Array<{ question: string; answer: string }>;
};

function baseExample(overrides: Partial<ProductInput>): ProductInput {
  return {
    name: "Salted Pecan Blondies",
    category: "Bakery",
    ingredients: [
      { name: "Flour" },
      { name: "Brown sugar" },
      { name: "Butter" },
      { name: "Eggs" },
      { name: "Texas pecans" },
      { name: "Sea salt" },
    ],
    allergens: ["Wheat", "Eggs", "Milk", "Tree nuts"],
    netQuantity: "8 oz (227 g)",
    businessName: "Hill Country Oven Co.",
    businessAddress: "123 Market Square, Austin, TX 78701",
    contactEmail: "hello@hillcountryoven.com",
    description: "Weekend market favorite with buttery caramel notes.",
    notes: "",
    ...overrides,
  };
}

export const marketingPages: Record<string, MarketingPage> = {
  law: {
    slug: "texas-cottage-food-law",
    keyword: "Texas cottage food law",
    title: "Texas Cottage Food Law",
    description:
      "Plain-English Texas cottage food law summary with a practical checklist for labels, booth signs, and direct-sale rules.",
    eyebrow: "Plain-English Rules",
    intro:
      "Texas sellers usually find the law summary first, then still have to translate it into a real label and booth setup. This page closes that gap with a checklist and live example.",
    bullets: [
      "Required disclosure language for labels and booth signage.",
      "What details belong on a market-ready product label.",
      "How to move from rules summary to printable materials.",
    ],
    exampleTitle: "Worked example: cookie label",
    exampleProduct: baseExample({}),
    faq: [
      {
        question: "Do Texas cottage food sellers need a product label?",
        answer: "Yes. A label needs the product identity, ingredients, allergen disclosure, producer info, and the Texas cottage food disclosure statement.",
      },
      {
        question: "Can this page replace legal advice?",
        answer: "No. It helps operationalize the rules, but sellers should review current Texas guidance before printing.",
      },
    ],
  },
  label: {
    slug: "texas-cottage-food-label-template",
    keyword: "Texas cottage food label template",
    title: "Texas Cottage Food Label Template",
    description:
      "Free Texas cottage food label generator and worked example for home bakers, candy makers, and market vendors.",
    eyebrow: "Free Generator",
    intro:
      "Use the live label builder to draft compliant wording, then save your product catalog and export print-ready PDFs when you need repeat market prep.",
    bullets: [
      "Live label preview with Texas disclosure wording.",
      "Ingredient ordering helper and allergen statement builder.",
      "Paid save/export workflow for repeat sellers.",
    ],
    exampleTitle: "Worked example: blondie label",
    exampleProduct: baseExample({}),
    faq: [
      {
        question: "What is included in a Texas cottage food label?",
        answer: "Product name, ingredients in descending order, allergens, net quantity, producer name and address, and the Texas disclosure statement.",
      },
      {
        question: "Can I export labels for free?",
        answer: "Authenticated free users get one export. Paid plans remove repeat-export limits and add saved products.",
      },
    ],
  },
  sign: {
    slug: "texas-cottage-food-sign-requirements",
    keyword: "Texas cottage food sign requirements",
    title: "Texas Cottage Food Sign Requirements",
    description:
      "See Texas booth sign requirements and generate a printable disclosure sign for markets, fairs, and direct-sale events.",
    eyebrow: "Booth Sign Builder",
    intro:
      "Booth signage is where market sellers lose time before every event. This page turns the Texas wording requirement into a ready-to-print sign block.",
    bullets: [
      "Live booth sign preview with business info.",
      "Disclosure wording you can reuse for repeated events.",
      "CTA into the paid dashboard for unlimited exports.",
    ],
    exampleTitle: "Worked example: booth sign",
    exampleProduct: baseExample({}),
    faq: [
      {
        question: "What should a Texas cottage food booth sign say?",
        answer: "It should clearly display the Texas cottage food disclosure language alongside your business name and contact details.",
      },
      {
        question: "Can I print different signs for different venues?",
        answer: "Yes. The app helps you save products and reuse the same compliance language across events.",
      },
    ],
  },
  bakery: {
    slug: "texas-home-bakery-label",
    keyword: "Texas home bakery label",
    title: "Texas Home Bakery Label",
    description:
      "Examples and a free draft generator for Texas home bakery labels with ingredient and allergen guidance.",
    eyebrow: "Bakery Example",
    intro:
      "Home bakers often juggle multiple cookie, brownie, and loaf labels each weekend. This example page shows how to convert one recipe into reusable label wording.",
    bullets: [
      "Worked bakery label example.",
      "Allergen guidance for common bakery ingredients.",
      "Path into saved templates for repeat SKUs.",
    ],
    exampleTitle: "Worked example: bakery label",
    exampleProduct: baseExample({ name: "Chocolate Chunk Brownies" }),
    faq: [
      {
        question: "Do bakery products need allergen statements?",
        answer: "If they contain major allergens like wheat, eggs, milk, soy, peanuts, or tree nuts, the label should call them out clearly.",
      },
      {
        question: "Can I duplicate labels for new flavors?",
        answer: "Paid plans let you duplicate products and edit only the changed ingredients or net weight.",
      },
    ],
  },
  candy: {
    slug: "ingredient-label-for-homemade-candy-texas",
    keyword: "Ingredient label for homemade candy texas",
    title: "Ingredient Label for Homemade Candy in Texas",
    description:
      "Texas candy label example, ingredient statement helper, and printable template workflow for homemade candy sellers.",
    eyebrow: "Candy Labels",
    intro:
      "Candy sellers often need nested ingredient lists for coatings, flavorings, and toppings. This page focuses on that exact workflow with a Texas-specific label example.",
    bullets: [
      "Example label with nested candy ingredients.",
      "Reusable template path for fudge, brittle, and coated candy.",
      "Texas disclosure text included in the preview.",
    ],
    exampleTitle: "Worked example: candy label",
    exampleProduct: baseExample({
      name: "Chocolate Sea Salt Toffee",
      category: "Candy",
      ingredients: [
        { name: "Butter" },
        { name: "Sugar" },
        { name: "Chocolate chips", subIngredients: "sugar, cocoa butter, milk, soy lecithin, vanilla" },
        { name: "Sea salt" },
      ],
      allergens: ["Milk", "Soy"],
      netQuantity: "6 oz (170 g)",
    }),
    faq: [
      {
        question: "How should candy ingredients be listed?",
        answer: "List ingredients by predominance and include sub-ingredients for blends like chocolate chips or flavored coatings when you have them.",
      },
      {
        question: "Does this tool sort ingredients automatically?",
        answer: "No. It helps format them, but sellers remain responsible for the correct predominance order.",
      },
    ],
  },
  freeze: {
    slug: "freeze-dried-candy-label-template-texas",
    keyword: "Freeze dried candy label template texas",
    title: "Freeze-Dried Candy Label Template Texas",
    description:
      "Texas freeze-dried candy label template with worked example, allergen helper, and export-ready preview.",
    eyebrow: "Freeze-Dried Candy",
    intro:
      "Freeze-dried candy is a high-intent Texas search term and a common product at local markets. This page gives sellers a fast starting point instead of a blank canvas.",
    bullets: [
      "Template wording tailored to freeze-dried candy sellers.",
      "Quick edit path for net weight, allergens, and business details.",
      "Upsell to save and export recurring products.",
    ],
    exampleTitle: "Worked example: freeze-dried candy label",
    exampleProduct: baseExample({
      name: "Freeze-Dried Sour Candy Bites",
      category: "Freeze-dried candy",
      ingredients: [
        { name: "Sour chewy candy", subIngredients: "corn syrup, sugar, citric acid, natural flavors, food coloring" },
      ],
      allergens: [],
      netQuantity: "3 oz (85 g)",
    }),
    faq: [
      {
        question: "Can freeze-dried candy sellers use the same Texas disclosure?",
        answer: "Yes. The same Texas cottage food disclosure language applies to the label and booth materials.",
      },
      {
        question: "Can I publish ingredient pages with a QR code?",
        answer: "Pro users can generate a shareable public ingredient page for each saved product.",
      },
    ],
  },
  fudge: {
    slug: "texas-fudge-label-requirements",
    keyword: "Texas fudge label requirements",
    title: "Texas Fudge Label Requirements",
    description:
      "Texas fudge label requirements explained with a sample label, allergen help, and printable sign workflow.",
    eyebrow: "Fudge Labels",
    intro:
      "Fudge often combines dairy, nuts, marshmallow, and flavor add-ins. This page focuses on building a clear label and allergen disclosure for that product type.",
    bullets: [
      "Fudge-specific example label.",
      "Common allergen callouts for milk and nuts.",
      "CTA to save a reusable vendor catalog.",
    ],
    exampleTitle: "Worked example: fudge label",
    exampleProduct: baseExample({
      name: "Rocky Road Fudge",
      category: "Fudge",
      ingredients: [
        { name: "Sweetened condensed milk" },
        { name: "Chocolate chips", subIngredients: "sugar, cocoa mass, cocoa butter, milk fat, soy lecithin" },
        { name: "Mini marshmallows" },
        { name: "Walnuts" },
      ],
      allergens: ["Milk", "Soy", "Tree nuts"],
      netQuantity: "7 oz (198 g)",
    }),
    faq: [
      {
        question: "What allergens are common in fudge?",
        answer: "Milk is common, and many fudge recipes also contain soy from chocolate and tree nuts from mix-ins.",
      },
      {
        question: "Do I need a booth sign as well as product labels?",
        answer: "Texas sellers typically need both a product label and visible disclosure signage for booth-based sales.",
      },
    ],
  },
  allergen: {
    slug: "allergen-statement-generator-texas-cottage-food",
    keyword: "Allergen statement generator texas cottage food",
    title: "Allergen Statement Generator for Texas Cottage Food",
    description:
      "Build a clear 'Contains' statement for Texas cottage food labels with a checkbox-based allergen helper and sample outputs.",
    eyebrow: "Allergen Helper",
    intro:
      "This utility page is focused on one task: helping sellers draft a clean allergen statement that matches the ingredients they already know are in the product.",
    bullets: [
      "Checkbox-driven allergen builder.",
      "Preview the finished 'Contains' statement instantly.",
      "Carry the result into a saved product record on paid plans.",
    ],
    exampleTitle: "Worked example: allergen statement",
    exampleProduct: baseExample({}),
    faq: [
      {
        question: "Does the allergen generator replace recipe review?",
        answer: "No. It formats the statement based on your input, but you must verify the underlying recipe and supplier ingredients yourself.",
      },
      {
        question: "Which allergens are included?",
        answer: "The common U.S. major allergens are available as quick-select options in the generator.",
      },
    ],
  },
  venue: {
    slug: "where-can-you-sell-cottage-food-in-texas",
    keyword: "Where can you sell cottage food in Texas",
    title: "Where Can You Sell Cottage Food in Texas",
    description:
      "Texas sales venue rules explained in plain English, plus a checklist for markets, pop-ups, direct orders, and local events.",
    eyebrow: "Venue Guidance",
    intro:
      "Many sellers know how to bake but still hesitate on where they can legally sell. This page turns venue guidance into a practical checklist tied to the generator workflow.",
    bullets: [
      "Direct-sale focused venue checklist.",
      "Worked example for market-day prep.",
      "CTA into the booth sign and label builders.",
    ],
    exampleTitle: "Worked example: market-day checklist",
    exampleProduct: baseExample({}),
    faq: [
      {
        question: "Can I sell at farmers markets in Texas?",
        answer: "Yes, when the product and sales setup fit Texas cottage food rules. Sellers should verify the current state guidance and any market-specific rules.",
      },
      {
        question: "What should I print before a market?",
        answer: "Bring compliant product labels, a booth disclosure sign, and a clear list of ingredients and allergens for each product you sell.",
      },
    ],
  },
};

export const launchChecklist = [
  "Verify ingredient order by predominance before printing.",
  "Include the Texas cottage food disclosure on every product label.",
  "Keep your booth sign visible anywhere products are displayed.",
  "Check direct-sale rules for the venue before the event date.",
  "Use saved product templates so repeated SKUs do not need to be rebuilt.",
];

export const templateProducts: ProductInput[] = [
  baseExample({ name: "Bakery Template", category: "Bakery" }),
  baseExample({
    name: "Candy Template",
    category: "Candy",
    ingredients: [
      { name: "Sugar" },
      { name: "Corn syrup" },
      { name: "Butter" },
      { name: "Chocolate chips", subIngredients: "sugar, cocoa butter, milk, soy lecithin" },
    ],
    allergens: ["Milk", "Soy"],
  }),
  baseExample({
    name: "Fudge Template",
    category: "Fudge",
    ingredients: [
      { name: "Sweetened condensed milk" },
      { name: "Chocolate chips", subIngredients: "sugar, cocoa mass, cocoa butter, milk fat, soy lecithin" },
      { name: "Vanilla" },
    ],
    allergens: ["Milk", "Soy"],
  }),
  baseExample({
    name: "Freeze-Dried Candy Template",
    category: "Freeze-dried candy",
    ingredients: [
      { name: "Candy base", subIngredients: "corn syrup, sugar, flavors, colors" },
    ],
    allergens: [],
  }),
];
