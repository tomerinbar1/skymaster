<template>
  <section class="course-page-wrapper">
    <div class="course">
      <h1>תהליך הוצאת רישיון טיס פרטי</h1>
      <h2>גיל מינימלי?</h2>
      <p>{{ textData.minAge }}</p>
      <h2>מה המסלול לקבלת רישיון טיס פרטי?</h2>
      <p>הוצאת רישיון טיס פרטי מותנית במעבר בהצלחה בשני שלבים:</p>
      <ol>
        <li v-for="item in textData.reqTests" :key="item">{{ item }}</li>
      </ol>
      <h2>השלב התיאורתי</h2>
      <p>יש לעבור בהצלחה 7 מבחני תיאוריה בנושאים הבאים:</p>
      <ul>
        <li v-for="item in textData.theoryList" :key="item">{{ item }}</li>
      </ul>
      <p>
        *יש לעבור פעם אחת בחיים מבחן רדיו טלפון והרישיון שיתקבל יהיה תקף עבור כל
        הרישיונות.
      </p>
      <h2>השלב המעשי</h2>
      <p>על מנת לגשת למבחן המעשי יש לטוס מינימום 40 שעות טיסה מודרכות.</p>
      <h2>רגע לפני שעולים לאוויר</h2>
      <p>ישנם עוד שני דברים שנדרשים לפני שמתיישבים מול ההגאים:</p>
      <ol>
        <li v-for="item in textData.reqTests" :key="item">{{ item }}</li>
      </ol>
      <h1>מוכנים להמריא?</h1>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getText } from '../services/text.service'

export default defineComponent({
  name: 'CoursesPage',
  components: {},
  props: {},
  data() {
    return {
      textData: {
        minAge: '',
        theoryList: [] as string[],
        reqTests: [] as string[],
      },
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getText()
  },
  mounted() {},
  methods: {
    getText() {
      const text = getText('')
      this.textData = text
    },
  },
})
</script>
