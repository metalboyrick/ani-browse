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

export default {
    GET_PAGINATED_ANIME_LIST
};