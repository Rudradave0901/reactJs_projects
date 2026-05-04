import React from 'react'
import CommonBanner from '../components/CommonBanner'
import Container from '../components/Container'
import ChefCard from '../components/ChefCard'
import { CHEFS_DATA } from '../Constants'

const ChefList = () => {
    const ALL_CHEFS = [...CHEFS_DATA, ...CHEFS_DATA, ...CHEFS_DATA];

    return (
        <>
            <CommonBanner
                sectionTitle='Chef'
                sectionTitleRed=''
                currentPage='Chef'
                classForStyle=''
            />

            <section className="chef-section py-10 md:py-[50px]">
                <Container>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
                        {ALL_CHEFS.map((chef, index) => (
                            <ChefCard
                                key={`${chef.id}-${index}`}
                                name={chef.name}
                                title={chef.title}
                                image={chef.image}
                            />
                        ))}
                    </div>
                </Container>
            </section>
        </>
    )
}

export default ChefList