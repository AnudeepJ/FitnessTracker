import { api } from '../HttpHelper';
import { useQuery } from 'react-query';

    
export const useFetchWorkLog = () => {

    const storedUser = JSON.parse(localStorage.getItem('userDetail'));
    const userId = storedUser.username;
    const uri = '/api/waterlog/' + userId;

    return  useQuery('waterLog', async () => {
        const response = await api.get(uri);
        return response.data;
      });
}    
