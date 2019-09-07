<template>
    <div>
        <!-- section intro -->
        <SectionIntro id="sectionIntro" />

        <!-- section volunteer team -->
        <SectionVolunteerTeam id="sectionVolunteerTeam" />

        <!-- section community -->
        <SectionCommunity id="SectionCommunity" />

        <!-- section rule -->
        <SectionRule id="SectionRule" />
    </div>
</template>

<script>
import SectionIntro from "./SectionIntro";
import SectionVolunteerTeam from "./SectionVolunteerTeam";
import SectionCommunity from "./SectionCommunity";
import SectionRule from "./SectionRule";

export default {
    components: {
        SectionIntro,
        SectionVolunteerTeam,
        SectionCommunity,
        SectionRule,
    },
}
</script>