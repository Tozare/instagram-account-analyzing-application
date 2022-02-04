import {FilterData} from "../types";

export const filter = (args: FilterData) => {
    const {
        posts,
        searchFilter,
        statusFilter
    } = args;

    return posts.filter((post) => {
        let isSuitableForSearchFilter = false;
        if (!searchFilter || post.text.toLowerCase().includes(searchFilter.toLowerCase())){
            isSuitableForSearchFilter = true;
        }
        let isSuitableForStatusFilter = false;
        if (statusFilter === "ALL"  || post.status === statusFilter){
            isSuitableForStatusFilter = true;
        }
        return isSuitableForSearchFilter && isSuitableForStatusFilter;
        //TODO: ADD filter to all possible keys of posts (text, from, userName)
    })

}
