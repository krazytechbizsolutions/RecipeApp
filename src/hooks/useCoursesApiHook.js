export const coursesQuery = (pageIndex, limit, sort = 'id:ASC') => `{
  courses(start: ${pageIndex * 10}, limit: ${limit}, sort: "${sort}") {
    id
    name
    caption
    description
    price
    validity
    promoVideoYoutubeId
    launchDate
    image {
      url
    }
    recipes {
        name
        recipeImage {
          name
          url
        }
    }
    rattings {
      id
      ratting
    }
    updated_at
  }
}`;

const getInfiniteCourses = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null;

  return [coursesQuery(pageIndex, 10), null, 'courses'];
};

export default getInfiniteCourses;
