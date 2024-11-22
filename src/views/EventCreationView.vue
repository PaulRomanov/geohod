<script setup>
import { ref, onMounted, onActivated, nextTick } from 'vue'
import { useRouter  } from "vue-router"
import { useWebAppTheme } from 'vue-tg'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ru } from 'date-fns/locale'

import { useEventStore } from '../stores/eventStore.js'
import CustomInput  from '../components/CustomInput.vue'
import Header from '../components/Header.vue'

const eventStore = useEventStore()
const router = useRouter()

const theme = useWebAppTheme()

const dataPickerTheme = ref( theme.colorScheme.value === 'dark' ? true : false )

const date = ref( new Date() )
const maxParticipants = ref( 30 )
const description = ref( '' )
const childInput = ref( null )

function createEvent() {
  if ( !description.value || !date.value || !maxParticipants.value ) return 

  const newEvent = {
    description: description.value,
    date: date.value,
    maxParticipants: maxParticipants.value,
  }

  eventStore.addEvent( newEvent ) 
  router.push( '/' )
}

function cansel() {
  router.push( '/' )
}

// Устанавливаем фокус на первый инпут при активации компонента
onMounted(() => {
  nextTick(() => {
    childInput.value.focusInput()
  })
})

</script>

<template>
  <div class="event-creation">
    <Header>Создание мероприятия</Header>
    <div class="event-creation__section">
      <CustomInput
        ref="childInput"
        v-model="description" 
        :maxLength="62" 
        :showLabel="true"
        label="Название" 
        placeholder="Введите название"
        
      />
      <div class="event-creation__datepicker-wrapper">
        <div class="event-creation__label">Дата</div>
        <div class="event-creation__datepicker">
          <!-- :enableTimePicker="false" Отключает функциональность выбора времени -->
          <!-- :hideInput="true" Скрываем отображение выбранной даты -->
            <VueDatePicker
              v-model="date" 
              :dark="dataPickerTheme" 
              inline
              auto-apply
              :locale="ru"
              :enableTimePicker="false" 
              ></VueDatePicker>
        </div>
      </div>
      <div class="event-creation__input-wrapper">
        <div class="event-creation__label">Максимум участников</div>
        <div class="event-creation__input-max-participants">
          <CustomInput
            v-model="maxParticipants"
            :maxLength="99"
            :acceptNumbersOnly="true"
            :showLabel="false"
            label="Максимум участников"
            placeholder="30"
          />
        </div>
      </div>
      <div class="event-creation__buttons-block">
        <button 
          class="event-creation__button event-creation__button--cancel"
          @click="cansel"
        >
          Отмена
        </button>
        <button 
          class="event-creation__button event-creation__button--confirm"
          @click="createEvent" 
        >
          Ок
        </button>
      </div>
    </div> 
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/_colors.css';
.event-creation {
  padding-top: 10px;
  &__section {
      padding: 0 12px;
      display: flex;
      flex-direction: column;
      gap: 20px;
  }
  &__input-wrapper,
  &__datepicker-wrapper {
      display: flex;
      flex-direction: column;
      gap: 10px;
  }
  &__label {
      color: var(--primary-blue);
  }
  &__input-max-participants {
    width: 44px;
  }
  &__buttons-block {
    display: flex;
    gap: 20px;
    position: fixed;
    bottom: 50px;
    right: 30px;
  }
  &__button {
    padding: 8px 16px;
    font-size: 16px;
    font-weight: 600;
    background-color: var(--bg_color);
    border: none;
    cursor: pointer;
    color: var(--primary-gray);
    transition: background-color 0.3s ease;
    &:hover {
      color: var(--primary-blue);
    }
  }
  //цвет border у datepicker
  .dp__theme_dark,
  .dp__theme_ligh {
    --dp-border-color-focus: var(--primary-blue);
    --dp-border-color-hover: var(--primary-blue);
  }
}
</style>
