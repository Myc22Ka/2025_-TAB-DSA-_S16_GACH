import React from 'react';
import DefaultLayout from '@/layouts/DefaultLayout';
import Section from '@/layouts/Section';
import MainHome from './MainHome';
function Home() {
    return (
        <DefaultLayout>
            <Section>
                <MainHome />
            </Section>
        </DefaultLayout>
    );
}

export default Home;
