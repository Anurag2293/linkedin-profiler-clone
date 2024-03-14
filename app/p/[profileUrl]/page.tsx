import type { User, Location, About, Experience, Education, Skill } from '@prisma/client';

import BackgroundDefault from '@/components/ui/background-default';

type Props = {
    params: {
        profileUrl: string
    }
}

const EmploymentTypeMap = {
    "FULL_TIME": "Full-time",
    "PART_TIME": "Part-time",
    "SELF_EMPLOYED": "Self-employed",
    "FREELANCE": "Freelance",
    "INTERNSHIP": "Internship",
    "TRAINEE": "Trainee"
}

const MonthMap = {
    "JANUARY": "Jan",
    "FEBRUARY": "Feb",
    "MARCH": "Mar",
    "APRIL": "Apr",
    "MAY": "May",
    "JUNE": "Jun",
    "JULY": "Jul",
    "AUGUST": "Aug",
    "SEPTEMBER": "Sep",
    "OCTOBER": "Oct",
    "NOVEMBER": "Nov",
    "DECEMBER": "Dec",
    "PRESENT": "Present",
}

type UserProfile = User & {
    location: Location,
    about: About,
    experiences: Array<Experience>,
    educations: Array<Education>,
    skills: Array<Skill>
}

export async function generateMetadata({ params }: Props) {
    const { profileUrl } = params;
    const userId = profileUrl.split('-').at(-1);
    const url = `${process.env.NEXT_PUBLIC_URL}/api/profile?userId=${userId}`;
    const response = await fetch(url, { cache: 'no-store' });
    const data = await response.json();
    const userProfile: UserProfile = data.userProfile;

    return {
        title: `${userProfile.firstName} ${userProfile.lastName} | LinkedIn`,
        description: userProfile.headline,
    }
}

const Profile = async (props: Props) => {
    const { profileUrl } = props.params;
    const getUserId = () => {
        const userId = profileUrl.split('-').at(-1);
        return userId;
    }

    async function getUserInfo() {
        const userId = getUserId();
        const url = `${process.env.NEXT_PUBLIC_URL}/api/profile?userId=${userId}`;
        const response = await fetch(url, { cache: 'no-store' });
        const data = await response.json();
        console.log({ data })
        return data;
    }

    const { error, userProfile }: { error: any, userProfile: UserProfile } = await getUserInfo();

    if (error) {
        return <div>There was error in fetching user profile!</div>
    }

    return (
        <div className='bg-[#F4F2EE] min-h-screen p-4 md:p-6 lg:p-8 flex flex-col gap-y-3 items-center'>
            <div className='w-full md:w-3/4 lg:w-7/12 xl:h-1/2 bg-white rounded-md'>
                <div className='w-full'>
                    <BackgroundDefault />
                </div>
                <div className='p-6'>
                    <h1 className='text-2xl font-semibold'>{userProfile.firstName} {userProfile.lastName}</h1>
                    <p className='text-[#555555]'>{userProfile.headline}</p>
                    <p className='text-[#828282] text-sm mt-1.5 mb-1'>{userProfile.location.city}, {userProfile.location.state}, {userProfile.location.country}</p>
                    <p className='text-[#0A66C2] text-sm font-medium mb-2'>500+ connections</p>
                    <button className='py-1 px-4 bg-[#0A66C2] font-semibold text-white rounded-3xl hover:bg-blue-900'>Open to</button>
                </div>
            </div>

            <div className='w-full md:w-3/4 lg:w-7/12 xl:h-1/2 p-6 bg-white rounded-md'>
                <h2 className='text-xl font-semibold mb-4'>About</h2>
                <p className='text-[#555555]'>{userProfile.about.about}</p>
            </div>

            <div className='w-full md:w-3/4 lg:w-7/12 xl:h-1/2 p-6 bg-white rounded-md'>
                <h2 className='text-xl font-semibold mb-4'>Experience</h2>
                {userProfile.experiences.map((exp, index) => (<div key={index}>
                    <h1 className='text-lg font-semibold'>{exp.title}</h1>
                    <p className='text-base text-[#555555]'>{exp.companyName}{' · '}{EmploymentTypeMap[exp.employmentType]}</p>
                    <p className='text-sm text-[#828282]'>{MonthMap[exp.startMonth]} {exp.startYear} - {MonthMap[exp.endMonth || "PRESENT"]} {exp.endYear}</p>
                    <p className='text-sm text-[#828282]'>{exp.location}</p>
                    <p className='text-base text-[#555555] mt-3'>{exp.description}</p>

                    <hr className={index === userProfile.experiences.length - 1 ? 'hidden' : ''} />
                </div>))}
            </div>

            <div className='w-full md:w-3/4 lg:w-7/12 xl:h-1/2 p-6 bg-white rounded-md'>
                <h2 className='text-xl font-semibold mb-4'>Education</h2>
                {userProfile.educations.map((edu, index) => (<div key={index}>
                    <h1 className='text-lg font-semibold'>{edu.school}</h1>
                    <p>{edu.degree} {edu.fieldOfStudy}</p>
                    <p className='text-sm text-[#828282]'>{MonthMap[edu.startMonth]} {edu.startYear} - {MonthMap[edu.endMonth || "PRESENT"]} {edu.endYear}</p>
                    <p className='text-sm text-[#828282]'>Grade: {edu.grade}</p>
                    <p className='text-base text-[#555555] mt-3'>{edu.description}</p>

                    <hr className={index === userProfile.experiences.length - 1 ? 'hidden' : ''} />
                </div>))}
            </div>

            <div className='w-full md:w-3/4 lg:w-7/12 xl:h-1/2 p-6 bg-white rounded-md'>
                <h2 className='text-xl font-semibold mb-4'>Skills</h2>
                <div className='flex flex-wrap gap-x-2 gap-y-2'>
                    {userProfile.skills.map((skill, index) => (<div key={index} className='bg-[#E9E9E9] px-3 py-1 rounded-3xl'>{skill.name}</div>))}
                </div>
            </div>
        </div>
    )
}

export default Profile

/*
<h1>{userProfile.firstName} {userProfile.lastName}</h1>
            <p>{userProfile.headline}</p>
            <p>{userProfile.location.city}, {userProfile.location.state}, {userProfile.location.country}</p>
            <p>{userProfile.about.about}</p>
            <h2>Experiences</h2>
            <ul>
                {userProfile.experiences.map((exp, index) => {
                    return <li key={index}>{exp.title} at {exp.companyName}</li>
                })}
            </ul>
            <h2>Education</h2>
            <ul>
                {userProfile.educations.map((edu, index) => {
                    return <li key={index}>{edu.degree} in {edu.fieldOfStudy} at {edu.school}</li>
                })}
            </ul>
*/