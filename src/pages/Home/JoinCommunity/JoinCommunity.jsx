import React from "react";

const JoinCommunity = () => {
  return (
    <section className="container mx-auto p-5 mt-16">
      <h2 className="text-center mb-10 text-4xl font-bold uppercase">
        Join Our <span className="text-ca-primary">Community</span>
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="space-y-5">
          <p>
            Cricketangon is for everyone and different from everyone. You can
            teach or you can learn, in both way you can empower youself with lot
            of skills and support.
          </p>
          <p>
            Cricketangon Community is the largest and one of the best eLearning
            group of Cricketangon, where you can get so many tips, tricks and
            news about newly arrival courses. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione, similique quos doloremque atque ab quibusdam voluptatem laudantium natus hic impedit nulla soluta provident optio excepturi quae nesciunt repellendus a eaque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio autem temporibus cupiditate cum impedit voluptas blanditiis, ratione sit atque ipsum.
          </p>
        </div>
        <div>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/tgbNymZ7vqY"
          ></iframe>
        </div>
      </div>
      <div className="shadow-lg p-5 text-center max-w-md border mx-auto mt-5">
        <h3 className="font-semibold text-xl">Cricketangon - ক্রিকেটাঙ্গন</h3>
        <p className=" text-gray-500">Public Group - 155403 Members</p>
        <a href="#" className="mt-3 btn bg-ca-dark text-white hover:bg-ca-primary rounded-none w-full">Join Our Facebook Group</a>
      </div>
    </section>
  );
};

export default JoinCommunity;
