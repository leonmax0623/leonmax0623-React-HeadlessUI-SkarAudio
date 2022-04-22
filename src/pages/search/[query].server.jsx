import {
  MediaFileFragment,
  ProductProviderFragment,
  useShopQuery,
  flattenConnection,
  RawHtml,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';

import LoadMoreProducts from '../../components/LoadMoreProducts.client';
import Layout from '../../components/Layout.server';
import ProductCard from '../../components/ProductCard';
import NotFound from '../../components/NotFound.server';

export default function SearchResults({
  country = {isoCode: 'US'},
  collectionProductCount = 24,
  params,
}) {
  const {query} = params;

  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      search: 'title:*' + query + ' OR ' + query + '*',
      country: country.isoCode,
      numProducts: collectionProductCount,
    },
  });

  let results = <>No Matches Found</>;

  // const collection = data.collection;

  const products = data.products.edges;

  if (products?.length > 0){
      results = <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {products.map((product) => (
              <li key={product.node.id}>
                  {product.node.title}
                  <ProductCard product={product.node} />
              </li>
          ))}
      </ul>;
  }

  // const hasNextPage = data.collection.products.pageInfo.hasNextPage;

  return (
    <Layout>
      <h1 className="font-bold text-4xl md:text-5xl text-gray-900 mb-6 mt-6">
        Search Results
      </h1>

      {results}

    </Layout>
  );
}

const QUERY = gql`
    query products(
        $search: String!
        $includeReferenceMetafieldDetails: Boolean = true
        $numProductMetafields: Int = 20
        $numProductVariants: Int = 250
        $numProductMedia: Int = 6
        $numProductVariantMetafields: Int = 10
        $numProductVariantSellingPlanAllocations: Int = 0
        $numProductSellingPlanGroups: Int = 0
        $numProductSellingPlans: Int = 0
    ) {
        products: products(first: 24, query: $search) {
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
