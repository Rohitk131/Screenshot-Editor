
const logos = [
  {
    name: 'Vercel',
    url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881430/vercel_wordmark_dark_mhv8u8.svg',
  },
  {
    name: 'Nextjs',
    url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881475/nextjs_logo_dark_gfkf8m.svg',
  },
  {
    name: 'Prime',
    url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/t2awrrfzdvmg1chnzyfr.svg',
  },
  {
    name: 'Trustpilot',
    url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/tkfspxqmjflfllbuqxsi.svg',
  },
  {
    name: 'Webflow',
    url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276560/logos/nymiivu48d5lywhf9rpf.svg',
  },

  {
    name: 'Airbnb',
    url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/pmblusboe7vkw8vxdknx.svg',
  },
  {
    name: 'Tina',
    url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276560/logos/afqhiygywyphuou6xtxc.svg',
  },
  {
    name: 'Stackoverflow',
    url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/ts1j4mkooxqmscgptafa.svg',
  },
  {
    name: 'mistral',
    url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/tyos2ayezryjskox3wzs.svg',
  },
]
export default function Navbar() {
  return (
    <div className="w-full flex justify-center items-center pt-2">
    <div className="w-1/2 flex justify-between items-center flex-row h-16 border-2 border-gray-300 rounded-3xl shadow-2xl px-6">
      <img
        src="https://gixland.com/wp-content/uploads/2021/11/logoipsum-logo-17-01.png"
        className="h-12"
        ></img>
      <div className="flex justify-between items-center flex-row gap-5 font-medium">
        <p>Features</p>
        <p>Pricing</p>
        <p>FAQs </p>
      </div>
      <button
        className={"group/button rounded-lg bg-[#222222] text-black"}
        >
        <span
          className={
              "block -translate-x-1 -translate-y-1 rounded-lg border-2 border-[#222222] bg-[#1aff67] px-4 py-1 text-sm font-medium tracking-tight transition-all group-hover/button:-translate-y-2 group-active/button:translate-x-0 group-active/button:translate-y-0"
            }
            >
          Login
        </span>
      </button>
    </div>
 </div>
  );
}
