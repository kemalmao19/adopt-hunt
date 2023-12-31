import { apiUrl } from "@/config/apiUrl";

async function getData() {
  const res = await fetch("https://adopt-hunt.vercel.app/api/users");
  const data = await res.json();
  console.log(data);
  return data;
}

export default async function Profile() {
  const { data } = await getData();
  const pupu = "kucing";

  console.log(data);
  console.log(pupu);

  return (
    <section>
      {data.map(({ id, email, contact, domicile, bio }) => {
        return (
          <div key={id}>
            <div>{email}</div>
            <div>{contact}</div>
            <div>{domicile}</div>
            <div>{bio}</div>
          </div>
        );
      })}
    </section>
  );
}
