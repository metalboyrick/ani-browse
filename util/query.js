
// GQL queries
import { gql } from "@apollo/client";

const GET_PAGINATED_ANIME_LIST = gql`
    query Page ($page: Int!, $perPage: Int!){
        Page (page: $page, perPage: $perPage){
            media {
                id
                bannerImage
                title {
                    english
                    romaji
                    native

                }
                coverImage {
                    medium
                    large
                }
                averageScore
                genres
                description
            }
        }
    }
`;

const GET_ANIME_DETAILS = gql`
    query Media ($id: Int!){
        Media (id: $id){
            id
            bannerImage
            title {
                    english
                    romaji
                    native

            }
            coverImage {
                    medium
                    large
            }
            averageScore
            genres
            description
            episodes
            startDate{
                year
            }
            endDate{
                year
            }
            format
            source
            studios(sort: FAVOURITES, isMain: true){
                edges{
                    node{
                        id
                        name
                    }
                }
            }
            tags{
                id
                name
            }
            characters(sort: RELEVANCE, role: MAIN, page: 1, perPage: 20){
                edges{
                    node{
                        id
                        name{
                            first 
                            middle
                            last
                        }
                        image{
                            medium
                            large
                        }
                    }
                    voiceActors (language: JAPANESE){
                        id
                        name{
                            full
                        }
                    }
                }
                
            }
        }
    }
`;

export default {
    GET_PAGINATED_ANIME_LIST,
    GET_ANIME_DETAILS
};