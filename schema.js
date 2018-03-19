const axios= require('axios')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLInputObjectType,
}= require('graphql');

// Users Type
const UsersType = new GraphQLObjectType({
    name:'Users',
    fields:()=>({
        id: {type:GraphQLInt},
        name:{type:GraphQLString},
        username:{type:GraphQLString},
        email:{type:GraphQLString},
        address:{type:AddressType},
        phone:{type:GraphQLString},
        website:{type:GraphQLString},
        company:{type:CompanyType},
    })
})

// Users input Type
const UsersInputType = new GraphQLObjectType({
    name:'UsersInput',
    fields:()=>({
        id: {type:GraphQLInt},
        name:{type:GraphQLString},
        username:{type:GraphQLString},
        email:{type:GraphQLString},
        address:{type:AddressInputType},
        phone:{type:GraphQLString},
        website:{type:GraphQLString},
        company:{type:CompanyInputType},
    })
})

//Company Type
const CompanyType= new GraphQLObjectType({
    name:'Company',
    fields:()=>({
        name:{type:GraphQLString},
        catchPhrase:{type:GraphQLString},
        bs:{type:GraphQLString}
    })
})

//Company Input Type
const CompanyInputType= new GraphQLInputObjectType({
    name:'CompanyInput',
    fields:()=>({
        name:{type:GraphQLString},
        catchPhrase:{type:GraphQLString},
        bs:{type:GraphQLString}
    })
})

//Address Type
const AddressType= new GraphQLObjectType({
    name:'Address',
    fields:()=>({
        street:{type:GraphQLString},
        suite:{type:GraphQLString},
        zipcode:{type:GraphQLString},
        geo:{type:GeoType}
    })
})

//Address Input Type
const AddressInputType= new GraphQLInputObjectType({
    name:'AddressInput',
    fields:()=>({
        street:{type:GraphQLString},
        suite:{type:GraphQLString},
        zipcode:{type:GraphQLString},
        geo:{type:GeoInputType}
    })
})

//Geo Type
const GeoType= new GraphQLObjectType({
    name:'Geo',
    fields:()=>({
        lat:{type:GraphQLString},
        lng:{type:GraphQLString}
    })
})

//Geo Input Type
const GeoInputType= new GraphQLInputObjectType({
    name:'GeoInput',
    fields:()=>({
        lat:{type:GraphQLString},
        lng:{type:GraphQLString}
    })
})

//Posts Type
const PostsType= new GraphQLObjectType({
    name:'Posts',
    fields:()=>({
        userId:{type:GraphQLInt},
        id:{type:GraphQLInt},
        title:{type:GraphQLString},
        body:{type:GraphQLString}
    })
})

//Todos Type
const TodosType= new GraphQLObjectType({
    name:'Todos',
    fields:()=>({
        userId:{type:GraphQLInt},
        id:{type:GraphQLInt},
        title:{type:GraphQLString},
        completed:{type:GraphQLBoolean}
    })
})

//Albums Type
const AlbumsType= new GraphQLObjectType({
    name:'Albums',
    fields:()=>({
        userId:{type:GraphQLInt},
        id:{type:GraphQLInt},
        title:{type:GraphQLString},
    })
})


//Photos Type
const PhotosType= new GraphQLObjectType({
    name:'Photos',
    fields:()=>({
        albumId:{type:GraphQLInt},
        id:{type:GraphQLInt},
        title:{type:GraphQLString},
        url:{type:GraphQLString},
        thumbnailUrl:{type:GraphQLString}
    })
})


//Comments Type
const CommentsType= new GraphQLObjectType({
    name:'Comments',
    fields:()=>({
        postId:{type:GraphQLInt},
        id:{type:GraphQLInt},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        body:{type:GraphQLString}
    })
})


// Root Query
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:({
        user:{
            type:UsersType,
            args:{
                id:{type:GraphQLInt}
            },
            resolve(parentValue, args){
                return axios.get("http://localhost:3000/users/"+args.id)
                            .then(response=>response.data);
            }   
        },
        comment:{
            type:CommentsType,
            args:{
                id:{type:GraphQLInt}
            },
            resolve(parentValue,args){
                return axios.get("http://localhost:3000/comments/"+args.id)
                            .then(comment=>comment.data)
            }
        },
        post:{
            type:PostsType,
            args:{
                id:{type:GraphQLInt}
            },
            resolve(parentValue,args){
                return axios.get("http://localhost:3000/posts/"+args.id)
                            .then(post=>post.data)
            }
        },
        album:{
            type:AlbumsType,
            args:{
                id:{type:GraphQLInt}
            },
            resolve(parentValue,args){
                return axios.get("http://localhost:3000/albums/"+args.id)
                            .then(album=>album.data)
            }
        },
        photo:{
            type:PhotosType,
            args:{
                id:{type:GraphQLInt}
            },
            resolve(parentValue,args){
                return axios.get("http://localhost:3000/photos/"+args.id)
                            .then(photo=>photo.data)
            }
        },
        todo:{
            type:TodosType,
            args:{
                id:{type:GraphQLInt}
            },
            resolve(parentValue,args){
                return axios.get("http://localhost:3000/todos/"+args.id)
                            .then(todo=>todo.data)
            }
        },
        users:{
            type: new GraphQLList(UsersType),
            resolve(parentValue,args){
                return axios.get("http://localhost:3000/users")
                            .then(users=>users.data)
            }
        },
        comments:{
            type: new GraphQLList(CommentsType),
            resolve(parentValue,args){
                return axios.get("http://localhost:3000/comments")
                            .then(comments=>comments.data)
            }
        },
        posts:{
            type: new GraphQLList(PostsType),
            resolve(parentValue,args){
                return axios.get("http://localhost:3000/posts")
                            .then(posts=>posts.data)
            }
        },
        albums:{
            type: new GraphQLList(AlbumsType),
            resolve(parentValue,args){
                return axios.get("http://localhost:3000/albums")
                            .then(albums=>albums.data)
            }
        },
        photos:{
            type: new GraphQLList(PhotosType),
            resolve(parentValue,args){
                return axios.get("http://localhost:3000/photos")
                            .then(photos=>photos.data)
            }
        },
        todos:{
            type: new GraphQLList(TodosType),
            resolve(parentValue,args){
                return axios.get("http://localhost:3000/todos")
                            .then(todos=>todos.data)
            }
        },

    })
});

//Mutations
const mutation= new GraphQLObjectType({
    name:'Mutation',
    fields:({
        editUser:{
            type:UsersType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLInt)},
                name:{type:GraphQLString},
                username:{type:GraphQLString},
                email:{type:GraphQLString},
                address:{type:AddressInputType},
                phone:{type:GraphQLString},
                website:{type:GraphQLString},
                company:{type:CompanyInputType},
            },
            resolve(parentValue,args){
                return axios.patch('http://localhost:3000/users/'+args.id,{
                    name:args.name,
                    username:args.username,
                    email:args.email,
                    address:args.address,
                    phone:args.phone,
                    website:args.website,
                    company:args.company
                })
                .then(response=>response.data);
            }
        },
        editPost:{
            type:PostsType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLInt)},
                userId:{type:GraphQLInt},
                title:{type:GraphQLString},
                body:{type:GraphQLString}
            },
            resolve(parentValue,args){
                return axios.patch('http://localhost:3000/posts/'+args.id,{
                    userId:args.userId,
                    title:args.title,
                    body:args.body
                })
                .then(response=>response.data);
            }
        },
        editTodo:{
            type:TodosType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLInt)},
                userId:{type:GraphQLInt},
                title:{type:GraphQLString},
                completed:{type:GraphQLBoolean}
            },
            resolve(parentValue,args){
                return axios.patch('http://localhost:3000/todos/'+args.id,{
                    userId:args.userId,
                    title:args.title,
                    completed:args.completed
                })
                .then(response=>response.data);
            }
        },
        editAlbum:{
            type:AlbumsType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLInt)},
                userId:{type:GraphQLInt},
                title:{type:GraphQLString}
            },
            resolve(parentValue,args){
                return axios.patch('http://localhost:3000/albums/'+args.id,{
                    userId:args.userId,
                    title:args.title
                })
                .then(response=>response.data);
            }
        },
        editPhoto:{
            type:PhotosType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLInt)},
                albumId:{type:GraphQLInt},
                title:{type:GraphQLString},
                url:{type:GraphQLString},
                thumbnailUrl:{type:GraphQLString}
            },
            resolve(parentValue,args){
                return axios.patch('http://localhost:3000/photos/'+args.id,{
                    userId:args.userId,
                    title:args.title,
                    url:args.url,
                    thumbnailUrl:args.thumbnailUrl
                })
                .then(response=>response.data);
            }
        },
        editComment:{
            type:CommentsType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLInt)},
                postId:{type:GraphQLInt},
                name:{type:GraphQLString},
                email:{type:GraphQLString},
                body:{type:GraphQLString}
            },
            resolve(parentValue,args){
                return axios.patch('http://localhost:3000/comments/'+args.id,{
                    name:args.name,
                    postId:args.postId,
                    email:args.email,
                    body:args.body
                })
                .then(response=>response.data);
            }
        },
        addUser:{
            type:UsersType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLInt)},
                name:{type:GraphQLString},
                username:{type:GraphQLString},
                email:{type:GraphQLString},
                address:{type:AddressInputType},
                phone:{type:GraphQLString},
                website:{type:GraphQLString},
                company:{type:CompanyInputType},
            },
            resolve(parentValue,args){
                return axios.post('http://localhost:3000/users',{
                    id:args.id,
                    name:args.name,
                    username:args.username,
                    email:args.email,
                    address:args.address,
                    phone:args.phone,
                    website:args.website,
                    company:args.company
                })
                .then(response=>response.data);
            }
        },
        addPost:{
            type:PostsType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLInt)},
                userId:{type:GraphQLInt},
                title:{type:GraphQLString},
                body:{type:GraphQLString}
            },
            resolve(parentValue,args){
                return axios.post('http://localhost:3000/posts',{
                    id:args.id,
                    userId:args.userId,
                    title:args.title,
                    body:args.body
                })
                .then(response=>response.data);
            }
        },
        addTodo:{
            type:TodosType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLInt)},
                userId:{type:GraphQLInt},
                title:{type:GraphQLString},
                completed:{type:GraphQLBoolean}
            },
            resolve(parentValue,args){
                return axios.post('http://localhost:3000/todos',{
                    id:args.id,
                    userId:args.userId,
                    title:args.title,
                    completed:args.completed
                })
                .then(response=>response.data);
            }
        },
        addAlbum:{
            type:AlbumsType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLInt)},
                userId:{type:GraphQLInt},
                title:{type:GraphQLString}
            },
            resolve(parentValue,args){
                return axios.post('http://localhost:3000/albums',{
                    id:args.id,
                    userId:args.userId,
                    title:args.title
                })
                .then(response=>response.data);
            }
        },
        addPhoto:{
            type:PhotosType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLInt)},
                albumId:{type:GraphQLInt},
                title:{type:GraphQLString},
                url:{type:GraphQLString},
                thumbnailUrl:{type:GraphQLString}
            },
            resolve(parentValue,args){
                return axios.post('http://localhost:3000/photos',{
                    id:args.id,
                    userId:args.userId,
                    title:args.title,
                    url:args.url,
                    thumbnailUrl:args.thumbnailUrl
                })
                .then(response=>response.data);
            }
        },
        addComment:{
            type:CommentsType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLInt)},
                postId:{type:GraphQLInt},
                name:{type:GraphQLString},
                email:{type:GraphQLString},
                body:{type:GraphQLString}
            },
            resolve(parentValue,args){
                return axios.post('http://localhost:3000/comments',{
                    id:args.id,
                    postId:args.postId,
                    name:args.name,
                    email:args.email,
                    body:args.body
                })
                .then(response=>response.data);
            }
        },
        putUser:{
            type:UsersType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLInt)},
                name:{type:GraphQLString},
                username:{type:GraphQLString},
                email:{type:GraphQLString},
                address:{type:AddressInputType},
                phone:{type:GraphQLString},
                website:{type:GraphQLString},
                company:{type:CompanyInputType},
            },
            resolve(parentValue,args){
                return axios.put('http://localhost:3000/users/'+args.id,{
                    name:args.name,
                    username:args.username,
                    email:args.email,
                    address:args.address,
                    phone:args.phone,
                    website:args.website,
                    company:args.company
                })
                .then(response=>response.data);
            }
        },
        putPost:{
            type:PostsType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLInt)},
                userId:{type:GraphQLInt},
                title:{type:GraphQLString},
                body:{type:GraphQLString}
            },
            resolve(parentValue,args){
                return axios.put('http://localhost:3000/posts/'+args.id,{
                    userId:args.userId,
                    title:args.title,
                    body:args.body
                })
                .then(response=>response.data);
            }
        },
        putTodo:{
            type:TodosType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLInt)},
                userId:{type:GraphQLInt},
                title:{type:GraphQLString},
                completed:{type:GraphQLBoolean}
            },
            resolve(parentValue,args){
                return axios.put('http://localhost:3000/todos/'+args.id,{
                    userId:args.userId,
                    title:args.title,
                    completed:args.completed
                })
                .then(response=>response.data);
            }
        },
        putAlbum:{
            type:AlbumsType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLInt)},
                userId:{type:GraphQLInt},
                title:{type:GraphQLString}
            },
            resolve(parentValue,args){
                return axios.put('http://localhost:3000/albums/'+args.id,{
                    userId:args.userId,
                    title:args.title
                })
                .then(response=>response.data);
            }
        },
        putPhoto:{
            type:PhotosType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLInt)},
                albumId:{type:GraphQLInt},
                title:{type:GraphQLString},
                url:{type:GraphQLString},
                thumbnailUrl:{type:GraphQLString}
            },
            resolve(parentValue,args){
                return axios.put('http://localhost:3000/photos/'+args.id,{
                    userId:args.userId,
                    title:args.title,
                    url:args.url,
                    thumbnailUrl:args.thumbnailUrl
                })
                .then(response=>response.data);
            }
        },
        putComment:{
            type:CommentsType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLInt)},
                postId:{type:GraphQLInt},
                name:{type:GraphQLString},
                email:{type:GraphQLString},
                body:{type:GraphQLString}
            },
            resolve(parentValue,args){
                return axios.put('http://localhost:3000/comments/'+args.id,{
                    postId:args.postId,
                    name:args.name,
                    email:args.email,
                    body:args.body
                })
                .then(response=>response.data);
            }
        },
        deleteUser:{
            type:UsersType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLInt)},
            },
            resolve(parentValue,args){
                return axios.delete('http://localhost:3000/users/'+args.id,{
                    
                })
                .then(response=>response.data);
            }
        },
        deletePost:{
            type:PostsType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLInt)},
            },
            resolve(parentValue,args){
                return axios.delete('http://localhost:3000/posts/'+args.id,{
                })
                .then(response=>response.data);
            }
        },
        deleteTodo:{
            type:TodosType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLInt)},
            },
            resolve(parentValue,args){
                return axios.delete('http://localhost:3000/todos/'+args.id,{
                })
                .then(response=>response.data);
            }
        },
        deleteAlbum:{
            type:AlbumsType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLInt)},
            },
            resolve(parentValue,args){
                return axios.delete('http://localhost:3000/albums/'+args.id,{
                })
                .then(response=>response.data);
            }
        },
        deletePhoto:{
            type:PhotosType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLInt)},
            },
            resolve(parentValue,args){
                return axios.delete('http://localhost:3000/photos/'+args.id,{
                })
                .then(response=>response.data);
            }
        },
        deleteComment:{
            type:CommentsType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLInt)},
            },
            resolve(parentValue,args){
                return axios.delete('http://localhost:3000/comments/'+args.id,{
                })
                .then(response=>response.data);
            }
        },
    })
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation
})