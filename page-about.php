<?php get_header(); ?>

<?php
if (have_posts()):
	while (have_posts()): the_post(); ?>

    <div class="about">
        <?php the_post_thumbnail(); ?>
        <?php the_content(); ?>
    </div>

<?php endwhile; endif; ?>
<?php get_footer(); ?>