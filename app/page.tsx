import HeaderSection from 'components/sections/HeaderSection'
import ResumeSection from 'components/sections/ResumeSection'
import StatsSection from 'components/sections/StatsSection'

export default function Page() {
  return (
    <section>
      <HeaderSection />
      <StatsSection />
      <br/>

      <ResumeSection />
    </section>
  )
}
