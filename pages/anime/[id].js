import { useRouter } from 'next/router';
import Head from 'next/head';

export default function AnimeDetail({ animeDetails }){

    const router = useRouter();
    const { id } = router.query;        // process elem by id

    
}