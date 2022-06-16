import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

const dummyMeetups = [
  {
    id: "m1",
    title: "A first meetup",
    img: "https://www.planetware.com/wpimages/2020/03/england-top-rated-cities-york.jpg",
    address: "Some address",
    description: "First meetup",
  },
  {
    id: "m2",
    title: "A second meetup",
    img: "https://www.planetware.com/wpimages/2020/03/england-top-rated-cities-york.jpg",
    address: "Some address",
    description: "Second meetup",
  },
];

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React meetups</title>
        <meta
          name="description"
          content="A very interesting, amazing and astonishing list of meeting places!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://Mariya:111@cluster0.27u3bar.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
