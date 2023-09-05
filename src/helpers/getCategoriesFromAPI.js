import axios from "axios";

export const getCategoriesFromAPI = async () => {
  let categoryNames = [];
  let categoriesToDisplay = [];
  let result = await axios({
    url: "https://9dzlvevp22.execute-api.eu-west-2.amazonaws.com/dev/products/all",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (result.data) {
    categoriesToDisplay = result.data.reduce((categoryArray, category) => {
      if (!categoryNames.includes(category.categorySummaryImages.category)) {
        categoryArray.push(category.categorySummaryImages);
        categoryNames.push(category.categorySummaryImages.category);
      }
      return categoryArray;
    }, []);
  }
  return categoriesToDisplay;
};
