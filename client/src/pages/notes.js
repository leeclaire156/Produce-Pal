import { STOREFRONT } from '../utils/queries';
import { useParams } from 'react-router-dom';

const { id } = useParams();
console.log(id);

const { loading, error, data } = useQuery(STOREFRONT, {
    variables: { id }
});

const storeData = data?.user || {};
console.log(storeData)