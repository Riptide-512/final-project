<template>
  <div class="about-page">
    <!-- Header Navigation -->
    <header class="bg-white shadow">
      <nav class="flex items-center justify-between px-8 py-4">
        <h1 class="text-2xl font-bold text-slate-800">EverAfter</h1>
        <ul class="flex gap-8">
          <li><router-link to="/" class="text-slate-700 hover:text-slate-900">Home</router-link></li>
          <li><router-link to="/services" class="text-slate-700 hover:text-slate-900">Services</router-link></li>
          <li><router-link to="/about" class="text-slate-700 hover:text-slate-900">About</router-link></li>
          <li><router-link to="/reviews" class="text-slate-700 hover:text-slate-900">Reviews</router-link></li>
        </ul>
      </nav>
    </header>

    <!-- Main Content -->
    <div class="about-container">
      <h1>About EverAfter</h1>
      <p class="intro-text">Learn about our mission to simplify wedding planning and make your special day stress-free.</p>
      
      <div class="about-content">
        <section class="content-section">
          <h2>The Problem</h2>
          <p>As engaged couples ourselves, we realized how overwhelming it can be trying to track so many aspects of wedding planning. Guest lists, invitations, RSVPs, and registries are usually scattered across different platforms. This leads to confusion, duplicated effort, and unnecessary stress during what should be a joyful time.</p>
        </section>

        <section class="content-section">
          <h2>Our Solution</h2>
          <p>Couples need a single, simplified platform to manage wedding planning tasks and reduce mental load. EverAfter solves this by centralizing essential wedding planning tools into one place. With minimal setup required, couples can focus more on celebrating their love and less on managing logistics.</p>
        </section>

        <section class="content-section">
          <h2>Our Mission</h2>
          <p>We believe every couple deserves to enjoy their engagement without the stress of complex planning. Our mission is to provide an intuitive, all-in-one platform that brings joy back into the planning process. We're here to support you every step of the way.</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
};
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.about-container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 10px;
}

.intro-text {
  text-align: center;
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 50px;
}

.about-content {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.content-section {
  margin-bottom: 30px;
}

.content-section:last-child {
  margin-bottom: 0;
}

.content-section h2 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 15px;
}

.content-section p {
  color: #666;
  line-height: 1.8;
  font-size: 1.05rem;
}
</style>