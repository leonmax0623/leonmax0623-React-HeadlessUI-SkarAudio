import gql from 'graphql-tag';
import {
  MediaFileFragment,
  ProductProviderFragment,
  useShopQuery,
  flattenConnection,
  RawHtml,
} from '@shopify/hydrogen';

export default function SearchBar() {
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      // term: 'ix',
      numProducts: 6,
    },
  });

  console.log(data);

  // Do the actual query
  let results = (
    <div className={'bg-white z-30 absolute'}>
      (
      <>
        {data.products.edges.map((product) => {
          console.log(product);
          return <>{product.node.title}</>;
        })}
        )
      </>
      )
    </div>
  );

  return (
    <div className={'relative'}>
      <input
        type="text"
        placeholder={'Search'}
      ></input>
      {results}
    </div>
  );
}

const QUERY = gql`
  query products(
#    $term: String!
    $includeReferenceMetafieldDetails: Boolean = true
    $numProductMetafields: Int = 20
    $numProductVariants: Int = 250
    $numProductMedia: Int = 6
    $numProductVariantMetafields: Int = 10
    $numProductVariantSellingPlanAllocations: Int = 0
    $numProductSellingPlanGroups: Int = 0
    $numProductSellingPlans: Int = 0
  ) {
      products: products(first: 5, query: "title:*ix OR ix*") {
          edges{
              node{
                  id
                  vendor
                  seo {
                      title
                      description
                  }
                  ...ProductProviderFragment
              }
          }
      }
  }

  ${ProductProviderFragment}
`;
