/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useMediaQuery } from 'react-responsive';
import Header from '../components/Header/header';
import cities from '../config/city-lists.json';
import Sponsors from '../components/Sponsors/sponsors';
import About from '../components/About/about';
import TicketCards from '../components/Cards/ticketCards';
import Heading from '../components/Typography/heading';
import Paragraph from '../components/Typography/paragraph';
import Subscription from '../components/Form/subscription';
import Speaker from '../components/Speaker/speaker';
import speakers from '../config/speakers.json';
import Link from 'next/link';
import Button from '../components/Buttons/button';
import Dropdown from '../components/Dropdown/dropdown';

export default function Home() {
	const isTablet = useMediaQuery({ maxWidth: '1118px' });
	const [speakersList, setSpeakersList] = useState([]);
	const [city, setCity] = useState("");
	speakers[0].lists = [];
	speakers.map((speaker) => {
		if (Array.isArray(speaker.lists) && Object.keys(speaker.lists).length > 0) {
			speakers[0].lists.push(...speaker.lists);
		}
	});
	const list = speakers[0].lists.filter((obj, index) => {
		return index === speakers[0].lists.findIndex(o => obj.name=== o.name);
	});
	speakers[0].lists =[...list];
	
	useEffect(() => {
		setCity(speakers[0]);
		setSpeakersList(speakers[0].lists);
	},[]);
	return (
		<div>
			<Head>
				<title>AsyncAPI Conference</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<img src='/img/illustra.png' className='color-effect' alt="background-illustration" />
			<Header />
			<div id='about' className='mt-20'>
				<About />
			</div>
			<div id="register" className='container mt-20'>
			<div className='flex items-center flex-col justify-center'>
			<div
			id='speakers'
			className='relative flex flex-col items-center justify-center'
			>
				<div className='text-center'>
					<div className='flex items-center justify-center'>
						<div className='w-[40px] h-[3px] bg-blue-400' />
						<div className='ml-4 text-lg sm:text-sm text-white font-semi-bold'>Speakers</div>
					</div>
				</div>
				<Heading typeStyle='heading-md' className='text-gradient text-center lg:mt-10'>
				Meet The Speakers
				</Heading>
				<div className='max-w-3xl sm:w-full text-center'>
					<Paragraph typeStyle='body-lg' className="mt-6" textColor='text-gray-200' >
					Discover the inspiring voices shaping our event, each bringing unique insights and expertise to the forefront of their respective fields.
					</Paragraph>
				</div>
				<div className='lg:py-20 w-[1130px] lg:w-full'>
						<div className='mt-[64px] '>
							{isTablet ? (
								<div className='w-full'>
									<Dropdown
									active={city.city}
									items={speakers}
									setOptions={setCity}
									setOptions2={setSpeakersList}
								/>
						</div>
							) : (
								<div className='flex justify-center'>
									<div className='w-[900px] lg:w-full flex justify-between'>
										{speakers.map((speaker) => {
											return (
												<div
												key={speaker.location}
												onClick={() => {
													setCity(speaker);
													setSpeakersList(speaker.lists);
												}}
												>
													<Button
													className={`w-[168px] ${
														city.city === speaker.city
															? 'gradient-bg'
															: 'border border-gray'
													}`}
													overlay={true}
													>
													{speaker.city}
													</Button>
												</div>
											);
										})}
									</div>
								</div>
							)}
						</div>

						<div className='mt-[64px] pb-[181px]'>
							{typeof speakersList === 'string' ? (
								<div className='mt-[140px] flex items-center justify-center text-center'>
									<div className='w-[720px] lg:w-full'>
										<Heading className='text-white'>
											{city.city} Speakers To Be Announced Soon - Stay Tuned!
										</Heading>
									</div>
								</div>
							) : Object.keys(speakersList).length > 0 ? (
								<div className='w-full grid grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-4'>
									{speakersList.map((speaker, i) => {
										return (
											<Speaker
												key={i}
												details={speaker}
												location={city}
												className='mt-10'
											/>
										);
									})}
								</div>
							) : (
								<div className='mt-[140px] flex items-center justify-center text-center'>
									<div className='w-[720px] lg:w-full'>
										<Heading typeStyle='heading-md' className='text-white'>
											{city.city} Speakers Coming Soon - Stay Tuned!
										</Heading>
										<Paragraph className='mt-12 text-gray-200'>
											We are actively accepting speaker applications, and you
											can start your journey by clicking the button below. Join
											us on stage and share your valuable insights with our
											enthusiastic audience!
										</Paragraph>
										<Link legacyBehavior href="https://apidays.typeform.com/to/ILJeAaV8?typeform-source=www.apidays.global#event_name=xxxxx">
										<a target="_blank">
											<Button className='mt-[80px] w-[244px] border border-gray card-bg'>
											Apply as a Speaker
											</Button>
										</a>
										</Link>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			<div className='flex items-center'>
				<div className='w-[40px] h-[3px] bg-blue-400' />
				<div className='ml-4 text-lg sm:text-sm text-white font-semi-bold'>Tickets</div>
			</div>
			<div data-test="ticket-section">
			<Heading typeStyle='heading-md' className='text-gradient text-center lg:mt-10'>
				Tickets Sale [Coming Soon]
			</Heading>
			<div className='max-w-3xl sm:w-full text-center'>
			<Paragraph typeStyle='body-lg' className="mt-6" textColor='text-gray-200' >
			Experience the Future of Asynchronous Communication: Tickets for Sale for the AsyncAPI Conference on Tour!
			</Paragraph>
			</div>
			<div className='w-[1000px] lg:w-full mt-10 flex justify-between lg:flex-col'>
				{cities.map((city) => <TicketCards key={city.name} city={city} className='lg:mt-10' />)}
			</div>
			</div>
			</div>
			</div>
			<div id='sponsors' className='mt-20'>
				<Sponsors imgs={['/img/apidays.png']} />
			</div>
			<div className='mt-5'>
			<Subscription/>
			</div>
		</div>
	);
}
