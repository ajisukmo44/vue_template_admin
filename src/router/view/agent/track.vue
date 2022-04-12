<template>
  <div class="flex justify-between px-4 mt-4 sm:px-8">
    <div class="flex">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sm:h-6 sm:w-6 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8 mr-2 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <h2 class="text-md sm:text-md md:text-md lg:text-lg xl:text-2xl text-gray-600 dark:text-gray-300">Agent Tracking - <span class="font-bold">{{user_info.name}}</span></h2>
    </div>

    <div class="flex items-center space-x-1 text-xs">
      <a href="#" class="font-bold text-indigo-700 dark:text-gray-300">Home</a>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-2 w-2 mt-1 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
      <span class="text-gray-600 dark:text-gray-300">Agent Management</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mt-1 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
      <span class="text-gray-600 dark:text-gray-300">Agent Tracking</span>
    </div>
  </div>

  <div class="grid grid-cols-1 mx-4 sm:mx-0 md:mx-0 lg:mx-0 xl:mx-0 mt-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-8 sm:px-8">
    <div class="bg-white border dark:border-transparent rounded-lg shadow sm:col-span-6 dark:bg-hover-dark">
      <div class="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4">
        <div class="col-span-2">
          <div class="flex p-2 justify-between sm:justify-start md:justify-start lg:justify-start">
            <button title="Request Current Location" class="w-full flex items-center border dark:bg-dark-mode dark:text-gray-200 dark:border-transparent rounded-md bg-blue-500 px-2 py-2 text-xs hover:bg-blue-600 mr-2" @click="requestLocation(userid)">
              <svg title="Request Current Location" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle fill="#fff" cx="12" cy="12" r="4"/><path fill="#fff" d="M13 4.069V2h-2v2.069A8.01 8.01 0 0 0 4.069 11H2v2h2.069A8.008 8.008 0 0 0 11 19.931V22h2v-2.069A8.007 8.007 0 0 0 19.931 13H22v-2h-2.069A8.008 8.008 0 0 0 13 4.069zM12 18c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"/>
              </svg>  
              <span class="text-white ml-1">Current Location</span>
            </button> 
            <button title="Request Video Streaming" class="w-full flex items-center border dark:bg-dark-mode dark:text-gray-200 dark:border-transparent rounded-md bg-blue-500 px-2 text-xs hover:bg-blue-600 mr-2" @click="requestVideoStreaming(userid)">
              <svg title="Request Video Streaming" width="22px" height="22px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                <g><g><g>
                    <path fill="#fff" d="M256,0C114.509,0,0,114.498,0,256c0,141.491,114.498,256,256,256c141.491,0,256-114.498,256-256
                      C512,114.509,397.502,0,256,0z M256,478.609c-122.746,0-222.609-99.862-222.609-222.609S133.254,33.391,256,33.391
                      S478.609,133.254,478.609,256S378.746,478.609,256,478.609z"/>
                    <path fill="#fff" d="M256,55.652C145.515,55.652,55.652,145.554,55.652,256c0,110.472,89.876,200.348,200.348,200.348
                      c110.668,0,200.348-90.081,200.348-200.348C456.348,145.528,366.472,55.652,256,55.652z M316.072,100.228
                      c44.073,17.055,79.153,52.297,95.994,96.475l-95.994,55.422C316.072,246.635,316.072,105.742,316.072,100.228z M282.681,91.185
                      V202.04c-4.757-2.746-126.709-73.156-131.475-75.907C189.441,95.219,237.351,83.874,282.681,91.185z M195.928,411.772
                      c-44.073-17.055-79.153-52.297-95.994-96.475l95.994-55.422C195.928,265.365,195.928,406.258,195.928,411.772z M91.049,281.868
                      c-7.26-46.482,5.212-94.115,35.63-131.34l95.93,55.385C217.855,208.658,95.825,279.111,91.049,281.868z M229.319,240.595
                      L229.319,240.595L256,225.191l26.681,15.404v30.809L256,286.809l-26.681-15.404V240.595z M229.319,420.815V309.96
                      c4.757,2.746,126.709,73.156,131.475,75.907C322.559,416.781,274.65,428.125,229.319,420.815z M385.321,361.472l-95.93-55.385
                      c4.754-2.745,126.783-73.198,131.56-75.955C428.211,276.612,415.738,324.247,385.321,361.472z"/>
                </g></g></g>
              </svg>
              <span class="text-white ml-1">Video Stream</span>
            </button>
            <button title="Request Device Info" class="w-full flex items-center border dark:bg-dark-mode dark:text-gray-200 dark:border-transparent rounded-md bg-blue-500 px-2 text-xs hover:bg-blue-600 mr-2" @click="requestDeviceInfo(userid)">
              <svg xmlns="http://www.w3.org/2000/svg" title="Request Device Info" width="22px" height="22px" fill="currentColor" class="bi bi-phone-vibrate" viewBox="0 0 16 16">
                <path fill="#fff" d="M10 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4zM6 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6z"/>
                <path fill="#fff" d="M8 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM1.599 4.058a.5.5 0 0 1 .208.676A6.967 6.967 0 0 0 1 8c0 1.18.292 2.292.807 3.266a.5.5 0 0 1-.884.468A7.968 7.968 0 0 1 0 8c0-1.347.334-2.619.923-3.734a.5.5 0 0 1 .676-.208zm12.802 0a.5.5 0 0 1 .676.208A7.967 7.967 0 0 1 16 8a7.967 7.967 0 0 1-.923 3.734.5.5 0 0 1-.884-.468A6.967 6.967 0 0 0 15 8c0-1.18-.292-2.292-.807-3.266a.5.5 0 0 1 .208-.676zM3.057 5.534a.5.5 0 0 1 .284.648A4.986 4.986 0 0 0 3 8c0 .642.12 1.255.34 1.818a.5.5 0 1 1-.93.364A5.986 5.986 0 0 1 2 8c0-.769.145-1.505.41-2.182a.5.5 0 0 1 .647-.284zm9.886 0a.5.5 0 0 1 .648.284C13.855 6.495 14 7.231 14 8c0 .769-.145 1.505-.41 2.182a.5.5 0 0 1-.93-.364C12.88 9.255 13 8.642 13 8c0-.642-.12-1.255-.34-1.818a.5.5 0 0 1 .283-.648z"/>
              </svg>
              <span class="text-white ml-1">Device Info</span>
            </button>
            <button title="Request List Installed App" class="w-full flex items-center border dark:bg-dark-mode dark:text-gray-200 dark:border-transparent rounded-md bg-blue-500 px-2 text-xs hover:bg-blue-600" @click="requestInstallApp(userid)">
              <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" fill="#fff" class="bi bi-grid-3x3-gap" viewBox="0 0 16 16">
                <path d="M4 2v2H2V2h2zm1 12v-2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V7a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm5 10v-2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V7a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zM9 2v2H7V2h2zm5 0v2h-2V2h2zM4 7v2H2V7h2zm5 0v2H7V7h2zm5 0h-2v2h2V7zM4 12v2H2v-2h2zm5 0v2H7v-2h2zm5 0v2h-2v-2h2zM12 1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zm-1 6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zm1 4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-2z"/>
              </svg>
              <span class="text-white ml-1">Installed App</span>
            </button>
          </div>
        </div>
        <div class="col-span-2">
          <div class="h-full flex justify-end p-2">
            <div class="w-full relative text-gray-400">
              <input
              id="send_message_data"
              name="send_message_data"
              type="send_message_data"
              v-model="send_message_data"
              class="p-4 
                  dark:bg-dark-mode 
                  dark:text-gray-400 
                  dark:border-gray-900
                  w-full
                  h-full
                  py-2
                  text-sm text-gray-900
                  rounded-md
                  border border-gray-300
                  focus:outline-none focus:ring-gray-500 focus:ring-gray-500 focus:z-10
              "
              placeholder="&nbsp;Type a message"
              />
            </div>
            <button class="block lg:hidden md:hidden sm:hidden border rounded-md bg-blue-500 text-white px-4 ml-2 py-2 text-sm dark:bg-btn-fama dark:text-gray-200 dark:border-transparent hover:bg-blue-600" @click="sendMessage(userid)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
              </svg>
            </button>
            <button class="hidden lg:block md:block sm:block border rounded-md bg-blue-500 text-white px-6 ml-2 py-2 text-sm dark:bg-btn-fama dark:text-gray-200 dark:border-transparent hover:bg-blue-600" @click="sendMessage(userid)">Send</button>
          </div>
        </div>
      </div>
      <!-- <div class="flex justify-between items-center px-4 py-2 mb-2 border-b-2 dark:border-gray-700 text-gray-600">
        <div class="flex flex-w">
            <button title="Request Current Location" class="border dark:bg-dark-mode dark:text-gray-200 dark:border-transparent rounded-md bg-blue-500 px-2 py-2 text-xs hover:bg-blue-600 mr-2" @click="requestLocation(userid)">
              <svg title="Request Current Location" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle fill="#fff" cx="12" cy="12" r="4"/><path fill="#fff" d="M13 4.069V2h-2v2.069A8.01 8.01 0 0 0 4.069 11H2v2h2.069A8.008 8.008 0 0 0 11 19.931V22h2v-2.069A8.007 8.007 0 0 0 19.931 13H22v-2h-2.069A8.008 8.008 0 0 0 13 4.069zM12 18c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"/>
              </svg>  
            </button> 
            <button title="Request Video Streaming" class="border dark:bg-dark-mode dark:text-gray-200 dark:border-transparent rounded-md bg-blue-500 px-2 text-xs hover:bg-blue-600 mr-2" @click="requestVideoStreaming(userid)">
              <svg title="Request Video Streaming" width="22px" height="22px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                <g><g><g>
                    <path fill="#fff" d="M256,0C114.509,0,0,114.498,0,256c0,141.491,114.498,256,256,256c141.491,0,256-114.498,256-256
                      C512,114.509,397.502,0,256,0z M256,478.609c-122.746,0-222.609-99.862-222.609-222.609S133.254,33.391,256,33.391
                      S478.609,133.254,478.609,256S378.746,478.609,256,478.609z"/>
                    <path fill="#fff" d="M256,55.652C145.515,55.652,55.652,145.554,55.652,256c0,110.472,89.876,200.348,200.348,200.348
                      c110.668,0,200.348-90.081,200.348-200.348C456.348,145.528,366.472,55.652,256,55.652z M316.072,100.228
                      c44.073,17.055,79.153,52.297,95.994,96.475l-95.994,55.422C316.072,246.635,316.072,105.742,316.072,100.228z M282.681,91.185
                      V202.04c-4.757-2.746-126.709-73.156-131.475-75.907C189.441,95.219,237.351,83.874,282.681,91.185z M195.928,411.772
                      c-44.073-17.055-79.153-52.297-95.994-96.475l95.994-55.422C195.928,265.365,195.928,406.258,195.928,411.772z M91.049,281.868
                      c-7.26-46.482,5.212-94.115,35.63-131.34l95.93,55.385C217.855,208.658,95.825,279.111,91.049,281.868z M229.319,240.595
                      L229.319,240.595L256,225.191l26.681,15.404v30.809L256,286.809l-26.681-15.404V240.595z M229.319,420.815V309.96
                      c4.757,2.746,126.709,73.156,131.475,75.907C322.559,416.781,274.65,428.125,229.319,420.815z M385.321,361.472l-95.93-55.385
                      c4.754-2.745,126.783-73.198,131.56-75.955C428.211,276.612,415.738,324.247,385.321,361.472z"/>
                </g></g></g>
              </svg>
            </button>
            <button title="Request Device Info" class="border dark:bg-dark-mode dark:text-gray-200 dark:border-transparent rounded-md bg-blue-500 px-2 text-xs hover:bg-blue-600 mr-2" @click="requestDeviceInfo(userid)">
              <svg xmlns="http://www.w3.org/2000/svg" title="Request Device Info" width="22px" height="22px" fill="currentColor" class="bi bi-phone-vibrate" viewBox="0 0 16 16">
                <path fill="#fff" d="M10 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4zM6 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6z"/>
                <path fill="#fff" d="M8 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM1.599 4.058a.5.5 0 0 1 .208.676A6.967 6.967 0 0 0 1 8c0 1.18.292 2.292.807 3.266a.5.5 0 0 1-.884.468A7.968 7.968 0 0 1 0 8c0-1.347.334-2.619.923-3.734a.5.5 0 0 1 .676-.208zm12.802 0a.5.5 0 0 1 .676.208A7.967 7.967 0 0 1 16 8a7.967 7.967 0 0 1-.923 3.734.5.5 0 0 1-.884-.468A6.967 6.967 0 0 0 15 8c0-1.18-.292-2.292-.807-3.266a.5.5 0 0 1 .208-.676zM3.057 5.534a.5.5 0 0 1 .284.648A4.986 4.986 0 0 0 3 8c0 .642.12 1.255.34 1.818a.5.5 0 1 1-.93.364A5.986 5.986 0 0 1 2 8c0-.769.145-1.505.41-2.182a.5.5 0 0 1 .647-.284zm9.886 0a.5.5 0 0 1 .648.284C13.855 6.495 14 7.231 14 8c0 .769-.145 1.505-.41 2.182a.5.5 0 0 1-.93-.364C12.88 9.255 13 8.642 13 8c0-.642-.12-1.255-.34-1.818a.5.5 0 0 1 .283-.648z"/>
              </svg>
            </button>
            <button title="Request List Installed App" class="border dark:bg-dark-mode dark:text-gray-200 dark:border-transparent rounded-md bg-blue-500 px-2 text-xs hover:bg-blue-600" @click="requestInstallApp(userid)">
              <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" fill="#fff" class="bi bi-grid-3x3-gap" viewBox="0 0 16 16">
                <path d="M4 2v2H2V2h2zm1 12v-2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V7a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm5 10v-2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V7a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zM9 2v2H7V2h2zm5 0v2h-2V2h2zM4 7v2H2V7h2zm5 0v2H7V7h2zm5 0h-2v2h2V7zM4 12v2H2v-2h2zm5 0v2H7v-2h2zm5 0v2h-2v-2h2zM12 1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zm-1 6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zm1 4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-2z"/>
              </svg>
            </button>
        </div>
        <div class="flex">
          <div class=" relative text-gray-400">
            <input
            id="send_message_data"
            name="send_message_data"
            type="send_message_data"
            v-model="send_message_data"
            class="p-4 
                dark:bg-dark-mode 
                dark:text-gray-400 
                dark:border-gray-900
                w-full
                py-2
                ml-2
                text-sm text-gray-900
                rounded-md
                border border-gray-300
                focus:outline-none focus:ring-gray-500 focus:ring-gray-500 focus:z-10
            "
            placeholder="&nbsp;Type a message"
            />
          </div>
          <button class="block lg:hidden md:hidden sm:hidden border rounded-md bg-blue-500 text-white px-4 ml-2 py-2 text-sm dark:bg-btn-fama dark:text-gray-200 dark:border-transparent hover:bg-blue-600" @click="sendMessage(userid)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
            </svg>
          </button>
          <button class="hidden lg:block md:block sm:block border rounded-md bg-blue-500 text-white px-6 ml-2 py-2 text-sm dark:bg-btn-fama dark:text-gray-200 dark:border-transparent hover:bg-blue-600" @click="sendMessage(userid)">Send</button>
        </div>
      </div> -->

    <div class="px-4 py-2" v-if="alert_success">
      <div :class="alert_type == 'success' ? 'bg-green-100 dark:bg-green-dark text-green-700' : 'bg-red-100 dark:bg-red-dark text-red-700'" class=" dark:text-gray-200 px-2 py-2 rounded relative" role="alert">
        <div class="flex">
          <strong class="font-bold flex"><svg :class="alert_type == 'success' ? 'text-green-500 dark:text-gray-200' : 'text-red-500 dark:text-gray-200'" class="fill-current h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg> {{alert_message}}</strong>
        </div>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-2">
            <svg @click="closeAlert" :class="alert_type == 'success' ? 'text-green-500 dark:text-gray-200' : 'text-red-500 dark:text-gray-200'" class="fill-current h-6 w-6 " role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </span>
      </div>
    </div>

      <div class="px-0 m-2 dark:bg-hover-dark bg-white rounded">
        <!-- map -->
        <div class="overflow-hidden border-0 rounded">     
          <GMapMap
              ref="mymap"
              :center= center
              :zoom= zoom
              :options="mapTheme()"
              class="maps"
              @click="measureDistance">
              <div ref="custom" class="flex flex-col items-center custom-control">
                <button title="Measure Distance" class="mb-2 mr-2.5 px-2 py-2 text-xs rounded-sm shadow hover:bg-gray-200 pointer" :class="measure_distance == true ? 'bg-blue-300' : 'bg-white' " @click="distanceMode()">
                  <img src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/24/000000/external-distance-maps-and-locations-those-icons-lineal-color-those-icons-2.png"/>
                </button>
                <button title="Point of Interest" class="mb-2 mr-2.5 bg-white px-2 py-2 text-xs rounded-sm shadow hover:bg-gray-200 pointer" @click="poiView()">
                  <img :src='poi == true ? "https://img.icons8.com/glyph-neue/24/24991f/point-of-interest.png" : "https://img.icons8.com/glyph-neue/24/525252/point-of-interest.png" '/>
                </button>
              </div>
              <GMapCluster
                :minimumClusterSize="5"
                :styles="clusterIcon"
                :zoomOnClick="true"
                class="clusterMap" >
                <GMapMarker
                  v-for="map in maps_report" 
                  :key="map.id_report"
                  :clickable="true"
                  :options="{ position: {lat: parseFloat(map.lat), lng: parseFloat(map.lng)}}"
                  :icon='{
                    path: "M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z",
                    fillColor: map.category.badge_color,
                    fillOpacity: 1,
                    strokeColor: "#636363",
                    strokeWeight: 0.5,
                    rotation: 0,
                    scale: 1.8,
                    anchor: {x: 10, y:15}
                  }'
                  @click="openMarker(map.id_report)"
                >
                <GMapInfoWindow
                :closeclick="true"
                @closeclick="openMarker(null)"
                :opened="openedMarkerID === map.id_report"
                >
                  <div>
                    <h4>Title : {{map.title}}</h4>
                    <h5>Date : {{map.incident_date}}</h5>
                    <p class="mt-2" style="width: 200px;">
                      {{map.description}}
                    </p>
                  </div>
                </GMapInfoWindow>
                </GMapMarker>
              </GMapCluster>

              <GMapMarker
                v-if="firstpoint.on == true"
                ref="first_point"
                :label="{
                  text: '0 km',
                  color: theme == 'dark' ? '#e5e7eb' : '#000000',
                  fontWeight: 'bold'
                }"
                :clickable="true"
                :options="{position: {lat: parseFloat(firstpoint.lat), lng: parseFloat(firstpoint.lng)}}"
                :icon="{
                  url: theme == 'dark' ? 'https://img.icons8.com/windows/30/e5e7eb/wind-speed-less-1.png' : 'https://img.icons8.com/windows/30/000000/wind-speed-less-1.png',
                  width: 50,
                  height: 50,
                  textSize: 12,
                  anchor: {x: 14, y: 16},
                  labelOrigin : {x: 5, y: -5},
                }"
                @click="unsetDistanceMarker('first')"
              />

              <GMapMarker
                v-if="secondpoint.on == true"
                ref="second_point"
                :label="{
                  text: distance+' km',
                  color: theme == 'dark' ? '#e5e7eb' : '#000000',
                  fontWeight: 'bold'
                }"
                :clickable="true"
                :options="{position: {lat: parseFloat(secondpoint.lat), lng: parseFloat(secondpoint.lng)}}"
                :icon="{
                  url: theme == 'dark' ? 'https://img.icons8.com/windows/30/e5e7eb/wind-speed-less-1.png' : 'https://img.icons8.com/windows/30/000000/wind-speed-less-1.png',
                  width: 50,
                  height: 50,
                  textSize: 12,
                  anchor: {x: 16, y: 16},
                  labelOrigin : {x: 5, y: -5},
                }"
                @click="unsetDistanceMarker('second')"
              />

              <GMapPolyline 
                v-if="firstpoint.on == true && secondpoint.on == true"
                :options="{ 
                  strokeColor: theme == 'dark' ? '#9ca3af' : '#212121', 
                  strokeOpacity: 0.8, 
                  strokeWeight: 3
                }"
                :path="[
                {lat: firstpoint.lat, lng: firstpoint.lng},
                {lat: secondpoint.lat, lng: secondpoint.lng}
                ]"
                :editable="false"
              />

              <GMapMarker
                v-for="(track, index) in trackerpoint" 
                :key="track.id"
                :label="{
                  text:String(index+1),
                  color: theme == 'dark' ? '#e5e7eb' : '#e5e7eb',
                  fontWeight: 'bold'
                }"
                :clickable="true"
                :options="{ position: {lat: parseFloat(track.lat), lng: parseFloat(track.lng)}}"
                :icon="{
                  url: theme == 'dark' ? 'https://img.icons8.com/ios-filled/50/991b1b/street-view.png' : 'https://img.icons8.com/ios-filled/50/EF4444/street-view.png',
                  textSize: 12,
                  anchor: {x: 25, y: 45},
                  labelOrigin : {x: 25, y: 22},
                }"
                @click="openMarker(track.id)"
              >
                <GMapInfoWindow
                :closeclick="true"
                @closeclick="openMarker(null)"
                :opened="openedMarkerID === track.id"
                >
                  <div>
                    <h4>LatLong : {{track.lat}}, {{track.lng}}</h4>
                    <h4>Date : {{track.date}}</h4>
                  </div>
                </GMapInfoWindow>
              </GMapMarker>

          </GMapMap>
        </div>
      </div>
    </div>

    <!-- get tracking -->
    <div class="bg-white dark:bg-hover-dark border dark:border-transparent rounded-lg shadow sm:col-span-2 mt-4 lg:mt-0 lg:ml-4 " v-if="track_location">
      <div class="flex items-center px-4 py-2 mb-2 border-b-2 dark:border-gray-700 text-gray-600">
        <div class="flex">
          <div class=" relative text-gray-400">
              <litepie-datepicker
                  as-single
                  use-range
                  v-model="dateValue"
                  :formatter="formatter"
                  placeholder="Occured at date range"
                  class="flex
                  dark:border-transparent
                  text-sm text-gray6900
                  rounded-md
                  border border-gray-300
                  focus:outline-none focus:ring-gray-500 focus:ring-gray-500 focus:z-10"
                  required></litepie-datepicker>
          </div>
          <button class="border dark:border-transparent rounded-md bg-blue-500 text-white px-6 ml-2 py-2 text-sm hover:bg-blue-600 dark:bg-btn-fama dark:text-gray-200 dark:border-transparent" @click="trackLocation()">Track</button>
        </div>
      </div>
      
       <div class="w-full px-4 pb-4 bg-white dark:bg-hover-dark rounded">
        <div class="border-0"> 
          <table class="w-full mt-2 text-gray-500 dark:text-gray-400">
            <thead class="border-b dark:border-gray-700">
              <tr>
                <th class="text-left py-1" colspan="3">TRACKING RECORD AT</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <td class="text-center p-3" v-if="trackloc == 0" colspan="6"> data not found</td>
              <tr v-for="loc in trackloc.data" :key="loc.id">
                <td class="p-1" width="7%">
                  <input
                    type="checkbox"
                    :checked="setCheck(loc.id)"
                    class="h-5 w-5 text-blue-500 border-gray-300 rounded cursor-pointer focus:ring-0"
                    @change="setTrackerPoint(loc.id, loc.lat, loc.lng, loc.delivery_time)"
                  />
                </td>
                <td class="text-sm py-1 pl-2">
                    <div>{{formatDateLog(loc.created_at)}}</div>
                    <small class="text-green-500">{{loc.coordinate}}</small>
                </td>
                <div v-for="(track, index) in trackerpoint" :key="track.id">
                  <td v-if="track.id == loc.id" class="p-1 text-md font-bold mt-2">{{index+1}}</td>
                </div>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="py-1 pt-3">
                  <div class="sm:flex-1 sm:flex sm:justify-between my-1  border-gray-200 dark:border-gray-700" v-if="trackloc.total !== 0">
                  <div class="flex">
                  <small> Total Page: {{trackloc.last_page}} </small> 
                  </div>
                  <div class="flex">
                  <small>  Total Record: {{trackloc.total}} </small>
                  </div>
                  </div>
                  <div class="sm:flex-1 sm:flex sm:justify-between" v-if="trackloc.total !== 0 && trackloc.total < 50">
                    <div>
                      <nav>
                          <ul class="flex">
                              <li class="page-item"  :class="[
                                          link.url === null ? 'disabled' : '',
                                          link.active ? 'active dark:bg-dark-mode bg-gray-200' : '']"
                                      v-for="(link, index) in trackloc.links"
                                      :key="index">
                                <button @click="link.url === null ? '#' : updatePage(link.url)" class="h-7 px-2 text-gray-600  border border-gray-600 hover:bg-gray-200  dark:hover:bg-dark-mode active:bg-green-400" v-if="link.label == 'pagination.previous'"><span><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg></span></button>
                                <button @click="link.url === null ? '#' : updatePage(link.url)" class="h-7 px-3 border border-gray-600 hover:bg-gray-200 active:text-green-800 dark:bg-dark-mode" v-if="link.label !== 'pagination.next' && link.label !== 'pagination.previous'"><small> {{link.label}} </small></button>
                                <button @click="link.url === null ? '#' : updatePage(link.url)" class="h-7 px-2 text-gray-600 border border-gray-600  active:bg-gray-500 dark:hover:bg-dark-mode" v-if="link.label == 'pagination.next'"><span><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg></span></button>
                              </li>
                          </ul>
                      </nav>
                    </div>
                  </div>
                  <div class="sm:flex-1 flex flex-wrap justify-between" v-if="trackloc.total > 50">
                    <div class="flex">
                    <nav>
                        <ul class="flex">
                            <li class="page-item flex"  :class="[
                                        link.url === null ? 'disabled' : '',
                                        link.active ? 'active dark:bg-dark-mode bg-gray-200' : '']"
                                    v-for="(link, index) in trackloc.links"
                                    :key="index">
                              <button @click="link.url === null ? '#' : updatePage(link.url)" class="h-7 px-2 text-gray-600 border border-gray-600  active:bg-green-400" v-if="link.label == 'pagination.previous'"><span><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg></span></button>
                              <button class="h-7 px-3 border border-gray-600 bg-gray-200 active:text-green-800 dark:bg-dark-mode" v-if="link.label == 'pagination.previous'"><small>{{trackloc.current_page}}</small></button>
                              <button @click="link.url === null ? '#' : updatePage(link.url)" class="h-7 px-2 text-gray-600 border border-gray-600  active:bg-gray-500" v-if="link.label == 'pagination.next'"><span><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg></span></button>
                            </li>
                        </ul>
                    </nav>
                  </div>

                  <div class="flex">
                    <nav>
                        <ul class="flex">
                            <li class="page-item flex">
                              <button class="h-7 px-3 text-gray-600 dark:text-gray-400 border border-gray-600 "><small> Go to page </small></button>
                              <input type="text" name="" id="" class="p-0 px-2 ml-0 text-sm w-10 dark:bg-dark-mode text-center bg-gray-200 dark:bg-dark-mode" v-model="pagination_page_location" >
                              <button class="h-7 px-3 text-gray-600 dark:text-gray-400 border border-gray-600 hover:bg-gray-200 dark:hover:bg-dark-mode" @click="updatePage(urlpage+'web/location/'+userid+'?page='+pagination_page_location)"><small class="flex flex-wrap">Go </small></button>
                            </li>
                        </ul>
                    </nav>
                  </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>      
        </div>
      </div>
    </div>

    <!-- live streaming -->
    <div class="bg-white dark:bg-hover-dark border dark:border-transparent rounded-lg shadow sm:col-span-2 mt-4 lg:mt-0 lg:ml-4" v-if="video_streaming">
      <div class="flex justify-center items-center px-4 py-2 mb-2 border-b-2 dark:border-gray-700 text-gray-600">
        <div class="flex flex-wrap">
          <button class="flex border dark:border-transparent dark:bg-btn-fama rounded-md bg-gray-500 text-white px-6 ml-2 py-2 text-xs hover:bg-gray-600"><svg xmlns="http://www.w3.org/2000/svg" class="flex h-5 w-6 flex" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg><span class="ml-1 text-sm">Record</span></button>
          <button @click="stopVideoStreaming" class="flex dark:border-transparent dark:bg-red-600 border rounded-md bg-gray-500 text-white px-6 ml-2 py-2 text-xs hover:bg-gray-600"> <svg xmlns="http://www.w3.org/2000/svg" class="flex h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clip-rule="evenodd" />
        </svg><span class="ml-1 text-sm">Stop</span></button>
        </div>
      </div>
      
      <div class="px-4 pb-4 bg-white dark:bg-hover-dark  rounded">
        <div class="overflow-hidden border-0"> 
          <div class="p-5 bg-white dark:bg-hover-dark rounded">
            <h4 class="flex text-red-400 justify-center"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mt-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 3.636a1 1 0 010 1.414 7 7 0 000 9.9 1 1 0 11-1.414 1.414 9 9 0 010-12.728 1 1 0 011.414 0zm9.9 0a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414zM7.879 6.464a1 1 0 010 1.414 3 3 0 000 4.243 1 1 0 11-1.415 1.414 5 5 0 010-7.07 1 1 0 011.415 0zm4.242 0a1 1 0 011.415 0 5 5 0 010 7.072 1 1 0 01-1.415-1.415 3 3 0 000-4.242 1 1 0 010-1.415zM10 9a1 1 0 011 1v.01a1 1 0 11-2 0V10a1 1 0 011-1z" clip-rule="evenodd" />
                </svg> <span class="ml-2"> Live Streaming </span>
              </h4>
            <img src="http://202.150.130.137:85/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER" class="cctv mt-5 rounded"/>
          </div>
        </div>
      </div>

    </div>

  </div>
  <div class="grid grid-cols-1 px-4 gap-2 mt-8 sm:grid-cols-4 sm:px-8">
    <div class="px-4 py-2 dark:bg-hover-dark bg-white border dark:border-transparent rounded-md overflow-hidden shadow">
      <h3 class="text-xl text-gray-600 dark:text-gray-300 mb-4">Device Info </h3>
      <div class="flex flex-col h-60 overflow-y-scroll custom-scroll pb-4">
        <div class="align-middle inline-block min-w-full">
          <div class="overflow-hidden border-0">
            <table class="table-auto min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700 text-sm text-gray-500 dark:text-gray-400">
                <tr >
                  <td class="py-1" width="25%">Model</td>
                  <td class="py-1 px-2">:</td>
                  <td class="py-1">{{device_info == null ? '-' : device_info.model}}</td>
                </tr>
                <tr >
                  <td class="py-1">ID</td>
                  <td class="py-1 px-2">:</td>
                  <td class="py-1">{{device_info == null ? '-' : device_info.id}}</td>
                </tr>
                <tr >
                  <td class="py-1">SDK</td>
                  <td class="py-1 px-2">:</td>
                  <td class="py-1">{{device_info == null ? '-' : device_info.sdk}}</td>
                </tr>
                <tr >
                  <td class="py-1">Manufacture</td>
                  <td class="py-1 px-2">:</td>
                  <td class="py-1">{{device_info == null ? '-' : device_info.manufacture}}</td>
                </tr>
                <tr >
                  <td class="py-1">Brand</td>
                  <td class="py-1 px-2">:</td>
                  <td class="py-1">{{device_info == null ? '-' : device_info.brand}}</td>
                </tr>
                <tr >
                  <td class="py-1">User</td>
                  <td class="py-1 px-2">:</td>
                  <td class="py-1">{{device_info == null ? '-' : device_info.user}}</td>
                </tr>
                <tr >
                  <td class="py-1">Type</td>
                  <td class="py-1 px-2">:</td>
                  <td class="py-1">{{device_info == null ? '-' : device_info.type}}</td>
                </tr>
                <tr >
                  <td class="py-1">Base</td>
                  <td class="py-1 px-2">:</td>
                  <td class="py-1">{{device_info == null ? '-' : device_info.base}}</td>
                </tr>
                <tr >
                  <td class="py-1">Incremental</td>
                  <td class="py-1 px-2">:</td>
                  <td class="py-1">{{device_info == null ? '-' : device_info.incremental}}</td>
                </tr>
                <tr >
                  <td class="py-1">Board</td>
                  <td class="py-1 px-2">:</td>
                  <td class="py-1">{{device_info == null ? '-' : device_info.board}}</td>
                </tr>
                <tr >
                  <td class="py-1">Host</td>
                  <td class="py-1 px-2">:</td>
                  <td class="py-1">{{device_info == null ? '-' : device_info.host}}</td>
                </tr>
                <tr >
                  <td class="py-1">Finger Print</td>
                  <td class="py-1 px-2">:</td>
                  <td class="py-1">{{device_info == null ? '-' : device_info.fingerprint}}</td>
                </tr>
                <tr >
                  <td class="py-1">Version Code</td>
                  <td class="py-1 px-2">:</td>
                  <td class="py-1">{{device_info == null ? '-' : device_info.versioncode}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="px-4 py-2 dark:bg-hover-dark bg-white  dark:border-transparent border rounded-md overflow-hidden shadow">
      <h3 class="text-xl text-gray-600 dark:text-gray-300 mb-4">User Info</h3>
      <div class="flex flex-col">
        <div class="align-middle inline-block min-w-full">
          <div class="overflow-hidden border-0">
            <table class="table-auto min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700 text-sm text-gray-500 dark:text-gray-400">
                <tr >
                  <td class="py-1">Name : {{user_info.name}}</td>
                </tr>
                <tr>
                  <td class="py-1">Username : {{user_info.username}}</td>
                </tr>
                <tr>
                  <td class="py-1">Email : {{user_info.email}}</td>
                </tr>
                <tr>
                  <td class="py-1">Address : {{user_info.address}}</td>
                </tr>
                <tr>
                  <td class="py-1">Created at : {{formatDate(user_info.created_at)}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="px-4 py-2 dark:bg-hover-dark  bg-white border dark:border-transparent rounded-md overflow-hidden shadow">
      <h3 class="text-xl text-gray-600 dark:text-gray-300 mb-4">Report Info</h3>
      <div class="flex flex-col">
        <div class="align-middle inline-block min-w-full">
          <div class="overflow-hidden border-0">
            <table class="table-auto min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700 text-sm text-gray-500 dark:text-gray-400">
                <tr >
                  <td class="py-1 font-bold">Total Report</td>
                  <td class="text-right">{{total_report}}</td>
                </tr>
                <tr>
                  <td class="py-1 font-bold">Last Report At </td>
                  <td class="text-right">{{(last_report === null ? '-' : formatDate(last_report.created_at))}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="px-4 py-2 dark:bg-hover-dark bg-white  dark:border-transparent border rounded-md overflow-hidden shadow">
      <h3 class="text-xl text-gray-600 dark:text-gray-300 mb-4">Apps Info</h3>
      <div class="flex flex-col h-60 overflow-y-scroll custom-scroll pb-4">
        <div class="align-middle inline-block min-w-full">
          <div class="overflow-hidden border-0">
            <table class="table-auto min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="text-sm text-gray-500 dark:text-gray-400 ">
                <tr>
                  <td class="font-bold">Name</td>
                  <td class="font-bold">Package</td>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 text-sm text-gray-500 dark:text-gray-400 dark:divide-gray-700">
                <tr v-for="(app, index) in app_info" :key="index">
                  <td class="py-1">{{app.app_name}}</td>
                  <td class="py-1">{{app.package_name}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-5 sm:px-8">
    <div class="bg-white dark:bg-hover-dark border dark:border-transparent rounded-lg shadow sm:col-span-5 ">
      <div class="flex justify-between items-center px-4 py-2 mb-2 border-b-2 dark:border-gray-700 text-gray-600">
        <button class="border rounded-sm bg-gray-200 px-4 py-2 text-xs hover:bg-gray-300 dark:bg-dark-mode dark:text-gray-200 dark:border-transparent">LOG ACTIVITES</button>
      </div>
      <div class="px-4 pb-4 bg-white dark:bg-hover-dark rounded"> 
        <table class="w-full mt-2 text-gray-500 dark:text-gray-400 text-xs sm:text-xs md:text-xs lg:text-md xl:text-lg">
          <thead class="border-b dark:border-gray-700">
            <tr>
              <th class="text-left ">ID LOG</th>
              <th class="text-left ">IP SOURCE</th>
              <th class="text-left ">REQUEST</th>
              <th class="text-left ">CREATED AT</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200  dark:divide-gray-700">
            <td class="text-center p-3" v-if="log_activity_all.total == 0" colspan="6"> data not found</td>
            <tr v-for="log in log_activity_all.data" :key="log.id">
              <td class="p-2">{{log.id_log}}</td>
              <td>{{log.ip_source}}</td>
                <td>
                    <div><small>Res Code : {{log.res_code}}</small></div>
                    <div><small>Req Method : {{log.req_method}}</small></div>
                    <div><small>Req Url : {{log.req_url}}</small></div>
                </td>
              <td>{{(log.created_at == null ? '-' : formatDateLog(log.created_at))}}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="7" class="py-2">
                <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                      <p class="text-sm text-gray-500">
                        Showing
                        <span class="font-medium">{{log_activity_all.from}}</span>
                        to
                        <span class="font-medium">{{log_activity_all.to}}</span>
                        of
                      <span class="font-medium">{{log_activity_all.total}}</span>
                      results 
                    </p>
                  </div>
                  <div>
                      <nav>
                          <div class="container flex justify-center mx-auto">
                          <ul class="flex">
                              <li class="page-item"  :class="[
                                          link.url === null ? 'disabled' : '',
                                          link.active ? 'active dark:bg-dark-mode  bg-gray-200' : '']"
                                      v-for="(link, index) in log_activity_all.links"
                                      :key="index">
                                <button @click="link.url === null ? '#' : updateloadActivity(link.url)" class="h-7 px-3  border dark:hover:bg-dark-mode border-gray-600 hover:bg-gray-200 active:bg-green-400" v-if="link.label == 'pagination.previous'"><span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg></span></button>
                                <button @click="link.url === null ? '#' : updateloadActivity(link.url)" class="h-7 px-3 border border-gray-600 dark:hover:bg-dark-mode hover:bg-gray-200 active:text-green-800" v-if="link.label !== 'pagination.next' && link.label !== 'pagination.previous'"><span>{{link.label}}</span></button>
                                <button @click="link.url === null ? '#' : updateloadActivity(link.url)" class="h-7 px-3  dark:hover:bg-dark-mode border border-gray-600  active:bg-gray-500" v-if="link.label == 'pagination.next'"><span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg></span></button>
                              </li>
                          </ul>
                          </div>
                      </nav>
                  </div>
                  <div>
                <nav>
                  <div class="container flex justify-center mx-auto">
                        <button class="h-7 px-3 text-gray-600 dark:text-gray-400 border border-gray-600 hover:bg-gray-200 dark:hover:bg-hover-dark"><span> Go to page</span></button>
                        <input type="text" name="" id="" class="p-0 px-2 ml-0 text-sm w-10 dark:bg-dark-mode" v-model="pagination_page">
                        <button class="h-7 px-3 text-gray-600 dark:text-gray-400 border border-gray-600 hover:bg-gray-200 dark:hover:bg-dark-mode" @click="updateloadActivity(urlpage+'web/logs/all-activity/'+userid+'?page='+pagination_page)"><span class="flex flex-wrap">Go </span></button>
                  </div>
                </nav>
              </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import AgentService from '@/services/agent.service'
import NotificationService from '@/services/notification.service'
import Pagination from '@/components/pagination/Pagination.vue'
import * as VueGoogleMaps from '@fawmi/vue-google-maps'
import moment from 'moment'
import { ref } from 'vue'
import { watch } from '@vue/runtime-core'

const API_URL = import.meta.env.VITE_BASE_API_URL;

export default {

  data() {
    const dateValue = ref([]);
    const formatter = ref({
      date: 'YYYY-MM-DD',
      month: 'MMM'
    });

    let clusterStyles = [{
      url: "/static/rec50.png",
      width: 50,
      height: 50,
      textSize: 12,
      textColor: '#fff',
      anchorText : [19, 0],
    }]

    return{
      alert_success: false,
      alert_type: '',
      alert_message: '',
      video_streaming:'',
      track_location:true,
      send_message_data:'',
      request_message_location:'Share Current Location',
      request_message_device_info:'Device Info',
      request_message_list_app:'List Install App',
      request_message_streaming:'Aktifkan video streaming',
      userid: this.$route.query.id,
      pagination_page:'',
      pagination_page_location:'',
      agents: [],
      user_info:[],
      device_info:[],
      app_info:[],
      maps_report: [],
      last_report: [],
      total_report: 0,
      log_activity_all: [],
      trackloc:[],
      maploc:[],
      openedMarkerID: null,
      clusterIcon: clusterStyles,
      dateValue,
      formatter,
      path: [],
      drawpath: false,
      measure_distance: false,
      distance: "",
      theme: "",
      line1: [],
      poi: false,
      urlpage: API_URL,
      firstpoint: {
        on: false,
        lat: 0,
        lng: 0
      },
      secondpoint: {
        on: false,
        lat: 0,
        lng: 0
      },
      start_point: {
        lat: 0,
        lng: 0
      },
      end_point: {
        lat: 0,
        lng: 0
      },
      trackerpoint: [],
      center: {lat: -2.687944013464189, lng: 117.81568343337175},
      zoom: 5,
      url: API_URL+'web/logs/all-activity/'+this.$route.query.id+'?page=1'
    }
  },
  components: {
    apexchart: VueApexCharts,
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Pagination,
  },

  computed: {
    google: VueGoogleMaps,
  },

  methods: {

    measureDistance(event){
      if (this.measure_distance == true) {
        this.setDistanceMarker(event.latLng.lat(), event.latLng.lng())
      } else {
        console.log('Normal Mode');
      }
    },

    getDistance(){
      const latA = parseFloat(this.firstpoint.lat);
      const lngA = parseFloat(this.firstpoint.lng);
      const latB = parseFloat(this.secondpoint.lat);
      const lngB = parseFloat(this.secondpoint.lng);
      let d = (google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(latA, lngA), new google.maps.LatLng(latB, lngB))/1000).toFixed(2);

      this.distance = d
    },

    setDistanceMarker(lat, lng){
      if(this.firstpoint.on == false){
        this.firstpoint.on  = true;
        this.firstpoint.lat = lat;
        this.firstpoint.lng = lng;
      }else if(this.secondpoint.on == false){
        this.secondpoint.on  = true;
        this.secondpoint.lat = lat;
        this.secondpoint.lng = lng;
      }else{
        this.resetDistanceMarker();
      }

      this.getDistance();
    },

    unsetDistanceMarker(point){
      if(point == 'first'){
        this.firstpoint.on  = false;
        this.firstpoint.lat = 0;
        this.firstpoint.lng = 0;
      }else if(point == 'second'){
        this.secondpoint.on  = false;
        this.secondpoint.lat = 0;
        this.secondpoint.lng = 0;
      }
    },

    resetDistanceMarker(){
      this.firstpoint.on  = false;
      this.firstpoint.lat = 0;
      this.firstpoint.lng = 0;
      this.secondpoint.on  = false;
      this.secondpoint.lat = 0;
      this.secondpoint.lng = 0;
    },

    distanceMode(){
      if (this.measure_distance == true) {
          this.measure_distance = false
          this.resetDistanceMarker();
      }else{
        this.measure_distance = true
      }
    },

    poiView(){
      if (this.poi == true) {
          this.poi = false
          console.log('poi->', this.poi);
      }else{
        this.poi = true
        console.log('poi->', this.poi);
      }
    },

    mapTheme(){
      let darkMode = {
        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: this.poi == true ? [{color: '#d59563'}] : [{visibility: 'off'}] 
            },
            {
                featureType: 'poi',
                elementType: 'labels.icon',
                stylers: this.poi == true ? [] : [{visibility: 'off'}] 
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: this.poi == true ? [{color: '#d59563'}] : [{visibility: 'off'}] 
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.icon',
                stylers: this.poi == true ? [] : [{visibility: 'off'}] 
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: this.poi == true ? [{color: '#d59563'}] : [{visibility: 'off'}] 
            },
            {
              featureType: "poi.business",
              stylers: this.poi == true ? [{color: '#d59563'}] : [{visibility: 'off'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#38414e'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{color: '#212a37'}]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{color: '#9ca5b3'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#746855'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#1f2835'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{color: '#f3d19c'}]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: this.poi == true ? [{color: '#d59563'}] : [{visibility: 'off'}] 
            },
            {
                featureType: 'transit',
                elementType: 'labels.icon',
                stylers: this.poi == true ? [] : [{visibility: 'off'}] 
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: this.poi == true ? [{color: '#d59563'}] : [{visibility: 'off'}] 
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{color: '#17263c'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#515c6d'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#17263c'}]
            }
        ]
      };

      let lightMode =  {
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: this.poi == true ? [{visibility: 'on'}] : [{visibility: 'off'}]
            },
            {
                featureType: 'poi',
                elementType: 'labels.icon',
                stylers: this.poi == true ? [{visibility: 'on'}] : [{visibility: 'off'}] 
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: this.poi == true ? [{visibility: 'on'}] : [{visibility: 'off'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.icon',
                stylers: this.poi == true ? [{visibility: 'on'}] : [{visibility: 'off'}] 
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: this.poi == true ? [{visibility: 'on'}] : [{visibility: 'off'}]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: this.poi == true ? [{visibility: 'on'}] : [{visibility: 'off'}]
            },
            {
                featureType: 'transit',
                elementType: 'labels.icon',
                stylers: this.poi == true ? [{visibility: 'on'}] : [{visibility: 'off'}]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: this.poi == true ? [{visibility: 'on'}] : [{visibility: 'off'}]
            },
        ]
      };

      if (this.theme != 'dark') {
        return lightMode;
      }else{
        return  darkMode;
      }
    },

    startIcon(){
      const icon = {
        path: "M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z",
        fillColor: "blue",
        fillOpacity: 1,
        strokeColor: "#636363",
        strokeWeight: 0.5,
        rotation: 0,
        scale: 1.8,
        anchor: new google.maps.Point(0, 0)
      }
      return icon;
    },

    endIcon(){
      const icon = {
        path: "M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z",
        fillColor: "green",
        fillOpacity: 1,
        strokeColor: "#636363",
        strokeWeight: 0.5,
        rotation: 0,
        scale: 1.8,
        anchor: new google.maps.Point(0, 0)
      }

      return icon;
    },

    loadAgent(){
        AgentService.getAgentTracker(this.userid)
        .then(response => {
            this.user_info    = response.data.data.user_info
            this.maps_report  = response.data.data.reports.maps
            this.last_report  = response.data.data.reports.last
            this.total_report = response.data.data.reports.total
        })
        .catch(e => {
            this.message = e.response.data.data
        });
    },
    
    loadDeviceInfo(){
        AgentService.getDeviceInfo(this.userid)
        .then(response => {
          this.device_info = response.data.data;
        })
        .catch(e => {
            this.message = e.response.data.data
        });
    },
    
    loadAppInfo(){
        AgentService.getAppInfo(this.userid)
        .then(response => {
          this.app_info = response.data.data;
        })
        .catch(e => {
            this.message = e.response.data.data
        });
    },

    loadActivity(){
        AgentService.getLogActivityAll(this.url)
        .then(response => {
            this.log_activity_all = response.data.data
        })
        .catch(e => {
            this.message = e.response.data.data
        });
    },

    trackLocation(){
      let data = {
        'date_start': this.dateValue[0],
        'date_end': this.dateValue[1]
      }

      this.path = [];
      
      AgentService.getTrackLocation(this.userid, data)
        .then(response => {
          this.trackloc   = response.data.data
        })
        .catch(e => {
          this.message = e.response
        });
    },

    updatePage(url) {
      let data = {
        'date_start': this.dateValue[0],
        'date_end': this.dateValue[1]
      }

      AgentService.getTrackLocationPage(url, data)
      .then((response) => { 
          this.trackloc = response.data.data
      })
      .catch(e => {
          this.message = e.response.data.data
          this.errors = e.response.data.errors
      });
    },

    updateloadActivity(url) {
      AgentService.getLogActivityPage(url)
      .then((response) => { 
          this.log_activity_all = response.data.data
      })
      .catch(e => {
          this.message = e.response.data.data
          this.errors = e.response.data.errors
      });
    },

    sendMessage(id) {
      var data = {
        'message': this.send_message_data,
      }
    NotificationService.sendMessageUser(id, data)
      .then((response) => {
        this.alert_success = true;
        this.alert_type = 'success';
        this.alert_message = 'Message sent successfully !';
        this.send_message_data = '';
      })
      .catch(e => {
          this.alert_success = true;
          this.alert_type = 'failed';
          this.alert_message = 'Failed send message! ';
          this.message = e.response.data.data
          this.errors = e.response.data.errors
      });
    },

    requestVideoStreaming(id) {
      var data1 = {
        'id': id,
        'link': 'http://202.150.130.137:85/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER',
      }
      var data = {
        'message': this.request_message_streaming,
      }
      localStorage.setItem('streaming1', JSON.stringify(data1));
    
      NotificationService.requestStreamingUser(id, data)
      .then((response) => { 
          this.alert_type = 'success';
          this.alert_success = true;
          this.alert_message = 'Message sent video stream successfully !';
          this.video_streaming = true
          this.track_location = ''
      })
      .catch(e => {
          this.alert_type = 'failed';
          this.alert_success = true;
          this.alert_message = 'Failed to sent message ! ';
          this.message = e.response.data.data
          this.errors = e.response.data.errors
      });
    },

    requestLocation(id) {
      var data = {
      'message': this.request_message_location,
    }
    NotificationService.requestLocationUser(id, data)
      .then((response) => { 
          this.alert_type = 'success';
          this.alert_success = true;
          this.alert_message = 'Message sent request location successfully !';
      })
      .catch(e => {
          this.alert_type = 'failed';
          this.alert_success = true;
          this.alert_message = 'Failed to sent message !';
          this.message = e.response.data.data
          this.errors = e.response.data.errors
      });
    },

    requestDeviceInfo(id) {
      var data = {
        'message': this.request_message_device_info,
      }
      NotificationService.requestDeviceInfoUser(id, data)
      .then((response) => { 
          this.alert_type = 'success';
          this.alert_success = true;
          this.alert_message = 'Message request device info successfully sent !';
          setTimeout(() => {
            this.loadDeviceInfo();
          }, 2000);
      })
      .catch(e => {
          this.alert_type = 'failed';
          this.alert_success = true;
          this.alert_message = 'Failed to sent message !';
          this.message = e.response.data.data
          this.errors = e.response.data.errors
      });
    },
    
    requestInstallApp(id) {
      var data = {
        'message': this.request_message_list_app
      }
      NotificationService.requestInstallAppUser(id, data)
      .then((response) => {
          this.alert_type = 'success';
          this.alert_success = true;
          this.alert_message = 'Message request installed app successfully sent !';
          setTimeout(() => {
            this.loadAppInfo();
          }, 2000);
      })
      .catch(e => {
          this.alert_type = 'failed';
          this.alert_success = true;
          this.alert_message = 'Failed to sent message !';
          this.message = e.response.data.data
          this.errors = e.response.data.errors
      });
    },

    stopVideoStreaming(){
      this.video_streaming = ''
      this.track_location = true
    },
    
    formatDate(value){
      return moment(value).format("DD MMMM YYYY");
    },

    formatDateLog(value){
      return moment(value).format("DD/MM/YYYY,  hh:mm:ss");
    },

    openMarker(id) {
      this.openedMarkerID = id
    },

    closeAlert(){
      this.alert_success = false;
      this.alert_message = '';
    },
    trafficMode() {
      this.$refs.mymap.$mapPromise.then(map => {
        const trafficLayer = new google.maps.TrafficLayer()
        trafficLayer.setMap(map);
      });
    },

    setTrackerPoint(id, lat, lng, date){
      let data = {
        id: id,
        lat: lat,
        lng: lng,
        date: date
      }
      this.$refs.mymap.$mapPromise.then(map => {
        if (this.trackerpoint.length == 0) {
          this.trackerpoint.push(data);
          this.path.push({lat: parseFloat(lat), lng: parseFloat(lng)});
          this.center = {lat: parseFloat(lat), lng: parseFloat(lng)};
          this.zoom = 12;
          this.line1.push({
            "id": id,
            "path" : new google.maps.Polyline({map: map,
              strokeColor: this.theme == 'dark' ? "#991b1b" : "#EF4444", 
              stokeOpacity: 0.5,
              strokeWeight: 2,
              geodesic: true,
              path: this.path
            })
          });
        }else{
          if (this.checkTrackerPoint(id) == 'unchecked') {
            this.trackerpoint.push(data);
            this.path.push({lat: parseFloat(lat), lng: parseFloat(lng)});
            this.center = {lat: parseFloat(lat), lng: parseFloat(lng)};
            this.zoom = 12;
            this.line1.push({
              "id": id,
              "path" : new google.maps.Polyline({map: map,
                strokeColor: this.theme == 'dark' ? "#991b1b" : "#EF4444", 
                stokeOpacity: 0.5,
                strokeWeight: 2,
                geodesic: true,
                path: this.path
              })
            });
          } else if (this.checkTrackerPoint(id) == 'checked') {
            let indexpoint = '';
            let indexpath = '';
            this.trackerpoint.map(function(val, index) {
              if (val.id == id) {
                indexpoint = index;
              }
            })
            this.path.map(function(val, index) {
              if (parseFloat(val.lat) == parseFloat(lat)) {
                indexpath = index;
              }
            })
            this.trackerpoint.splice(indexpoint, 1);
            this.path.splice(indexpath, 1);
            this.zoom = 12;
            for (let i = 0; i < this.line1.length; i++) {
              this.line1[i].path.setMap(null)
            }
            this.line1.push({
              "id": id,
              "path" : new google.maps.Polyline({map: map,
                strokeColor: this.theme == 'dark' ? "#991b1b" : "#EF4444", 
                stokeOpacity: 0.5,
                strokeWeight: 2,
                geodesic: true,
                path: this.path
              })
            });
          }
        }
      });
    },

    setCheck(id){
      for (let i = 0; i < this.line1.length; i++) {
        if (id == this.line1[i].id) {
          return true;
        }  
      }
      return false
    },

    checkTrackerPoint(id){
      for (let i = 0; i < this.trackerpoint.length; i++) {
        if (id == this.trackerpoint[i].id) {
          return 'checked';
        }
      }
      return 'unchecked';
    },

    setControl(){
      const centerControlDiv = this.$refs.custom;
      this.$refs.mymap.$mapPromise.then(map => {
        map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(centerControlDiv);
      });
    },
  },

  mounted(){
    this.theme = localStorage.getItem('theme');
    this.trafficMode();
    this.loadAgent();
    this.loadActivity();
    this.loadDeviceInfo();
    this.loadAppInfo();
    this.trackLocation();
    this.setControl();
  },
}
</script>

<style scoped>
.maps{
  width: 100%;
  height: 560px;
}
.clusterMap .cluster img{
  object-fit: cover !important;
}
.custom-scroll::-webkit-scrollbar {
  width: 0px;
}
</style>
