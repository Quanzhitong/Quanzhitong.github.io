import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { postsByDate } from '../data/legacyPosts';

export async function GET(context) {
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: postsByDate.map((post) => ({
			title: post.title,
			description: post.description,
			pubDate: new Date(post.date),
			link: post.href,
		})),
	});
}
