
export async function getServerSideProps(ctx) {
  const res = await axios.get(
    `http://localhost:8000/posts/search?q=${encodeURIComponent(ctx.query.q)}`,
  );
  const ress = JSON.parse(res.data.posts);
  const openapi = JSON.parse(res.data.rcps);

  await Promise.all(
    Object.values(openapi).map(async (val) => {
      const api = await axios.get(`${
        process.env.NEXT_PUBLIC_VIEW_TN_RECIPE_INFO
      }
    /1/100?RECIPE_NM_KO=${encodeURIComponent(val)}`);
      const obj = {
        recipeId: api.data.Grid_20150827000000000226_1.row[0].RECIPE_ID,
        title: val,
        url: api.data.Grid_20150827000000000226_1.row[0].IMG_URL,
      };
      ress.push(obj);
    }),
  );

  return {
    props: {
      posts: ress,
    },
  };
}
