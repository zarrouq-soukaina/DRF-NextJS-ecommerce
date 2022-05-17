import { makeStyles } from "@material-ui/core/styles";
import Header from "../components/header";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";


const useStyles = makeStyles((theme) => ({
  example: {
    color: "#ccc",
  },
  cardGrid: {
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "0",
  },
  cardMedia: {
    paddingTop: "140%",
  },
}));

function Home({ posts}) {
  const classes = useStyles();
  return (
    <>
    <Header />
    {console.log(posts)}
    <div className={classes.example}>
    {posts.map((post) => (
     <Link key={post.id} href={`product/${encodeURIComponent(post.slug)}`}>
     <Grid item xs={6} sm={4} md={3}>
       <Card className={classes.card} elevation={0}>
       <CardMedia
                        className={classes.cardMedia}
                        image={post.product_image[0].image}
                        title="Image title"
                        alt={post.product_image[0].alt_text}
                      />
         <CardContent>
           <Typography gutterBottom component="p">
             {post.title}
           </Typography>
           <Box component="p" fontSize={16} fontWeight={900}>
             £{post.regular_price}
           </Box>
         </CardContent>
       </Card>
     </Grid>
   </Link>
    ))}
    </div>
    </>
  )
}
export async function getStaticProps() {
  const res = await fetch("http://127.0.0.1:8000/api/");
  const posts = await res.json(); 
  return {
    props: {
      posts,
    },
  };
}

export default Home;
